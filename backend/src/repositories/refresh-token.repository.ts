import {IRefreshToken} from "../interfaces/refresh-token.interface";
import {RefreshToken} from "../models/refresh-token.modele";
import {FilterQuery} from "mongoose";


class RefreshTokenRepository {

    public async create(dto: Partial<IRefreshToken>): Promise<IRefreshToken> {
        return await RefreshToken.create(dto);
    }

    public async findByParams(params: FilterQuery<IRefreshToken>): Promise<IRefreshToken> {
        return await RefreshToken.findOne(params);
    }

    public async deleteByParams(params: Partial<IRefreshToken>): Promise<void> {
        await RefreshToken.deleteOne(params);
    }
}

export const refreshTokenRepository = new RefreshTokenRepository();