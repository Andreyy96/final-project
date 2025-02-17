import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";

import {ISignIn} from "../interfaces/auth.interface";
import {IDTOUser, IUser} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";
import {ApiError} from "../errors/api-error";
import {accessTokenRepository} from "../repositories/access-token.repository";
import {refreshTokenRepository} from "../repositories/refresh-token.repository";
import {tokenService} from "./token.service";
import {passwordService} from "./password.service";
import {UserRoleEnum} from "../enums/user-role.enum";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum";
import {actionTokenRepository} from "../repositories/action-token.repository";
import {emailService} from "./email.service";
import {EmailTypeEnum} from "../enums/email-type.enum";
import {configs} from "../configs/config";

class AuthService {

    public async signIn(
        dto: ISignIn,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email)

        if (!user) {
            throw new ApiError("User not found", 421);
        }

        if (!user.password) {
            throw new ApiError("Manager must activate his profile", 403)
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

    public async createManager(
        dto: IDTOUser,
    ): Promise<IUser> {
        await this.isEmailExistOrThrow(dto.email);
        return await userRepository.create({
            name: dto.name,
            surname: dto.surname,
            email: dto.email,
            role: UserRoleEnum.MANAGER,
        });
    }

    public async activateAccountSendEmail(
        jwtPayload: ITokenPayload,
        userId: string
    ): Promise<void> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", 404);
        }

        const token = tokenService.generateActionTokens(
            { userId: user._id,  role: user.role },
            ActionTokenTypeEnum.ACTIVATE,
        );

        await actionTokenRepository.create({
            type: ActionTokenTypeEnum.ACTIVATE,
            _userId: user._id,
            token,
        });

        await emailService.sendMail(EmailTypeEnum.ACTIVATE, "taurussilver777@gmail.com", {
            frontUrl:  configs.FRONT_URL,
            actionToken: token
        })
    }

    public async activateAccount(
        jwtPayload: ITokenPayload,
        dto: { password: string, confirm_password: string}
    ): Promise<void> {
        const password = await passwordService.hashPassword(dto.password);
        await userRepository.updateById(jwtPayload.userId, { password });

        await actionTokenRepository.deleteByParams({
            _userId: jwtPayload.userId,
            type: ActionTokenTypeEnum.ACTIVATE,
        });
    }

    private async isEmailExistOrThrow(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError("Email already exists", 409);
        }
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