import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";

import {ISignIn, ISignUp} from "../interfaces/auth.interface";
import {IUser} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";
import {ApiError} from "../errors/api-error";
import {accessTokenRepository} from "../repositories/access-token.repository";
import {refreshTokenRepository} from "../repositories/refresh-token.repository";
import {tokenService} from "./token.service";
import {UserRoleEnum} from "../enums/user-role.enum";
import {passwordService} from "./password.service";

class AuthService {

    public async signUp(
        dto: ISignUp,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {

        const password = await passwordService.hashPassword(dto.password);

        const user = await userRepository.create({
            name: dto.name,
            surname: dto.surname,
            email: dto.email,
            password,
            role: UserRoleEnum.ADMIN,
            is_active: true,
            last_login: new Date()
        })

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });

        await this.createTokens(user._id, tokens)

        return { user, tokens };
    }

    public async signIn(
        dto: ISignIn,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email)

        if (!user) {
            throw new ApiError("User not found", 421);
        }

        const isPasswordCorrect = await passwordService.comparePassword(dto.password, user.password)
        if (!isPasswordCorrect) {
            throw new ApiError("Invalid credentials", 401);
        }

       await this.deleteTokens(user._id)

        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });

        await this.createTokens(user._id, tokens)

        const updateUser = await userRepository.updateLastLoginById(user._id)

        return {user: updateUser, tokens};
    }

    public async refresh(
        jwtPayload: ITokenPayload,
    ): Promise<ITokenPair> {
        await this.deleteTokens(jwtPayload.userId)

        const tokens = tokenService.generateTokens({
            userId: jwtPayload.userId,
            role: jwtPayload.role,
        });
        await this.createTokens(jwtPayload.userId, tokens)

        return tokens;
    }

    public async signOut(jwtPayload: ITokenPayload): Promise<void> {
        const user = await userRepository.getById(jwtPayload.userId);

        await this.deleteTokens(user._id)
    }

    private async createTokens(_userId: string, tokens: ITokenPair): Promise<void> {
        await Promise.all([
            accessTokenRepository.create({
                accessToken: tokens.accessToken,
                _userId,
            }),
            refreshTokenRepository.create({
               refreshToken: tokens.refreshToken,
               _userId,
            })
        ])
    }

    private async deleteTokens(_userId: string): Promise<void> {
        await Promise.all([
            accessTokenRepository.deleteByParams({
                _userId
            }),
            refreshTokenRepository.deleteByParams({
                _userId
            })
        ])
    }
}

export const authService = new AuthService();