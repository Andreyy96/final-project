import {Router} from "express";
import {commonMiddleware} from "../middlewares/common.middleware";
import {AuthValidator} from "../validators/auth.validator";

import {authController} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {UserValidator} from "../validators/user.validator";
import {accessMiddleware} from "../middlewares/access.middleware";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum";

const router = Router();

router.post(
    "/sign-in",
    commonMiddleware.isBodyValid(AuthValidator.schemaForLogin),
    authController.signIn,
);

router.get(
    "/me",
    authMiddleware.checkAccessToken,
    authController.me,
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

router.post(
    "/activate",
    authMiddleware.checkAccessToken,
    accessMiddleware.isAdmin,
    authController.activateAccountSendEmail,
);

router.post(
    "/recovery-password",
    authMiddleware.checkAccessToken,
    accessMiddleware.isAdmin,
    commonMiddleware.isBodyValid(AuthValidator.recoveryPassword),
    authController.recoveryPasswordSendEmail,
);

router.post(
    "/sign-up/manager",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(UserValidator.schemaForCreateUser),
    accessMiddleware.isAdmin,
    authController.createManager
);

router.put(
    "/recovery-password/:actionToken",
    authMiddleware.checkActionToken(ActionTokenTypeEnum.RECOVERY_PASSWORD),
    commonMiddleware.isBodyValid(AuthValidator.schemaForSetPassword),
    commonMiddleware.isPasswordsEqual(),
    authController.recoveryPasswordSet,
);

router.put(
    "/activate/:actionToken",
    authMiddleware.checkActionToken(ActionTokenTypeEnum.ACTIVATE),
    commonMiddleware.isBodyValid(AuthValidator.schemaForSetPassword),
    commonMiddleware.isPasswordsEqual(),
    authController.activateAccount,
);

export const authRouter = router;