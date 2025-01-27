import { NextFunction, Request, Response } from "express";

import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { tokenService } from "../services/token.service";
import {accessTokenRepository} from "../repositories/access-token.repository";
import {refreshTokenRepository} from "../repositories/refresh-token.repository";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
        ) {
        try {
            const header = req.headers.authorization;

            if (!header) {
                throw new ApiError("Token is not provided", 401);
            }

            const accessToken = header.split("Bearer ")[1];

            const payload = tokenService.verifyToken(
                accessToken,
                TokenTypeEnum.ACCESS,
                );

            const token = await accessTokenRepository.findByParams({ accessToken });

            if (!token) {
                throw new ApiError("Token is not valid", 401);
            }
            req.res.locals.jwtPayload = payload;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
        ) {
      try {
        const header = req.headers.authorization;

        if (!header) {
          throw new ApiError("Token is not provided", 401);

        }
        const refreshToken = header.split("Bearer ")[1];

        const payload = tokenService.verifyToken(
          refreshToken,
          TokenTypeEnum.REFRESH,
        );

        const pair = await refreshTokenRepository.findByParams({ refreshToken });

        if (!pair) {
          throw new ApiError("Token is not valid", 401);

        }

        req.res.locals.jwtPayload = payload;
        next();
      } catch (e) {
        next(e);
      }
    }
}
export const authMiddleware = new AuthMiddleware();