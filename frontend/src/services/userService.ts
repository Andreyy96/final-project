import {urls} from "../constants/urls.ts";
import {apiService} from "./apiService.ts";
import {IRes} from "../types/responeType.ts";
import {IManagerRes} from "../interfaces/user.interface.ts";


const userService = {
    getAllManagers: (query: string):IRes<IManagerRes> => apiService.get(urls.user.getAllManagers(query)),
    bannedById: (userId: string): IRes<void> => apiService.patch(urls.user.bannedById(userId)),
    unbannedById: (userId: string): IRes<void> => apiService.patch(urls.user.unbannedById(userId))
}

export {
    userService
}