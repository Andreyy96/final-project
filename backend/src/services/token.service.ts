import jsonwebtoken from "jsonwebtoken";

import { configs } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

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

  public verifyToken(token: string, type: TokenTypeEnum): ITokenPayload {
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

  public generateActionTokens(
    payload: ITokenPayload,
    tokenType: ActionTokenTypeEnum,
  ): string {
    let secret: string;
    let expiresIn: any;

    switch (tokenType) {
      case ActionTokenTypeEnum.ACTIVATE:
        secret = configs.ACTION_ACTIVATE_SECRET;
        expiresIn = configs.ACTION_ACTIVATE_EXPIRATION;
        break;
      case ActionTokenTypeEnum.RECOVERY_PASSWORD:
        secret = configs.ACTION_RECOVERY_PASSWORD_SECRET;
        expiresIn = configs.ACTION_RECOVERY_PASSWORD_EXPIRATION;
        break;

      default:
        throw new ApiError("Invalid token type", 400);
    }

    return jsonwebtoken.sign(payload, secret, { expiresIn });
  }

  public verifyActionToken(
    token: string,
    type: ActionTokenTypeEnum,
  ): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case ActionTokenTypeEnum.ACTIVATE:
          secret = configs.ACTION_ACTIVATE_SECRET;
          break;
        case ActionTokenTypeEnum.RECOVERY_PASSWORD:
          secret = configs.ACTION_RECOVERY_PASSWORD_SECRET;
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
