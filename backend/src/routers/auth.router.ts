import { Router } from "express";
import {commonMiddleware} from "../middlewares/common.middleware";
import {AuthValidator} from "../validators/auth.validator";

import { authController } from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/aurh.middleware";


const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.isBodyValid(AuthValidator.schemaForCreateUser),
    authController.signUp,
);

router.post(
    "/sign-in",
    commonMiddleware.isBodyValid(AuthValidator.schemaForLogin),
    authController.signIn,
);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.delete(
    "/sign-out",
    authMiddleware.checkAccessToken,
    authController.signOut,
);





export const authRouter = router;