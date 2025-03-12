import {urls} from "../constants/urls.ts";
import {apiService} from "./apiService.ts";
import {IRes} from "../types/responeType.ts";
import {IGroup} from "../interfaces/group.interface.ts";

const groupService = {
    getAll: ():IRes<IGroup[]> => apiService.get(urls.group.getAll),
    createGroup: (dto: {name: string}):IRes<void> => apiService.post(urls.group.createGroup, dto),
}

export {
    groupService
}