import * as jsonwebtoken from "jsonwebtoken";

import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import {TokenTypeEnum} from "../enums/token-type.enum";
import {configs} from "../configs/config";

class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {
            expiresIn: configs.JWT_ACCESS_EXPIRATION,
        });
        const refreshToken = jsonwebtoken.sign(
            payload,
            configs.JWT_REFRESH_SECRET,
            { expiresIn: configs.JWT_REFRESH_EXPIRATION },
        );
        return { accessToken, refreshToken };
    }

    public verifyToken(
        token: string,
        type: TokenTypeEnum,
    ): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = configs.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = configs.JWT_REFRESH_SECRET;
                    break;
                default:
                    throw new ApiError("Invalid token type", 400);
            }

            return jsonwebtoken.verify(token, secret) as ITokenPayload;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new ApiError("Invalid token", 401);
        }
    }


}

export const tokenService = new TokenService();