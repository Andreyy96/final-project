import {Request, Response, NextFunction} from "express";
import {authService} from "../services/auth.service";
import {ISignIn, ISignUp} from "../interfaces/auth.interface";
import {ITokenPayload} from "../interfaces/token.interface";


class AuthController {

    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as ISignUp;
            const result = await authService.signUp(dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as ISignIn;
            const result = await authService.signIn(dto);
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


}

export const authController = new AuthController();
