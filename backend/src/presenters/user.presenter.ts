import {IUser} from "../interfaces/user.interface";

class UserPresenter {
    public toPublicResDto(entity: IUser): Partial<IUser> {
        return {
            _id: entity._id,
            name: entity.name,
            surname: entity.surname,
            email: entity.email,
            is_active: entity.is_active,
            last_login: entity.last_login,
            role: entity.role,
        };
    }
}

export const userPresenter = new UserPresenter();
