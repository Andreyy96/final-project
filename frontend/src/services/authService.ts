import {IAuthUser, IUser} from "../interfaces/user.interface.ts";
import {urls} from "../constants/urls.ts";

import {IRes} from "../types/responeType.ts";
import {ITokenPair} from "../interfaces/token.interface.ts";
import {apiService} from "./apiService.ts";

const accessTokenKey = "access"
const refreshTokenKey = "refresh"

const authService = {
    async login(loginDTO: { email: string, password: string }): Promise<IUser> {
        const {data} = await apiService.post(urls.auth.login, loginDTO)
        const {user, tokens} = data as IAuthUser
        this.setTokens(tokens)
        return user
    },
    me(): IRes<IUser> {
        return apiService.get(urls.auth.me)
    },
    async refresh(): Promise<void> {
        const refresh = this.getRefreshToken();
        const {data} = await apiService.post(urls.auth.refresh, {refresh});
        this.setTokens(data)
    },
    async logOut(): Promise<void> {
        await apiService.delete(urls.auth.logOut)
        this.deleteTokens()
    },
    setTokens(tokens: ITokenPair): void {
        localStorage.setItem(accessTokenKey, tokens.accessToken)
        localStorage.setItem(refreshTokenKey, tokens.refreshToken)
    },
    getAccessToken(): string {
        return localStorage.getItem(accessTokenKey)
    },
    getRefreshToken(): string {
        return localStorage.getItem(refreshTokenKey)
    },
    deleteTokens(): void {
        localStorage.removeItem(accessTokenKey)
        localStorage.removeItem(refreshTokenKey)
    }
}

export {
    authService
}