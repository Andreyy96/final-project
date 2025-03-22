import {Request, Response, NextFunction} from "express";
import {authService} from "../services/auth.service";
import {ITokenPayload} from "../interfaces/token.interface";
import {IDTOUser, IUser} from "../interfaces/user.interface";

class AuthController {

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const user =  req.res.locals.user as IUser
            const result = await authService.signIn(user);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const result = await authService.getMe(jwtPayload);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async createManager(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IDTOUser;
            const result = await authService.createManager(dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }


    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const result = await authService.refresh(jwtPayload);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async signOut(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            await authService.signOut(jwtPayload);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async activateAccountSendEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const userId = req.query.userId as string

            await authService.activateAccountSendEmail(jwtPayload, userId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async activateAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const dto = req.body as { password: string, confirm_password: string}

            await authService.activateAccount(jwtPayload, dto);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async recoveryPasswordSendEmail(req: Request, res: Response, next: NextFunction) {
        try {
            // const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const email = req.body.email as string

            await authService.recoveryPasswordSendEmail(email);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async recoveryPasswordSet(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const dto = req.body as { password: string, confirm_password: string}

            await authService.recoveryPasswordSet(dto, jwtPayload);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
