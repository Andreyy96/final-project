import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import cors from "cors"

import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import {configs} from "./configs/config";
import {orderRouter} from "./routers/order.router";
import {commentRouter} from "./routers/comment.router";
import {groupRouter} from "./routers/group.router";
import {userRouter} from "./routers/user.router";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/orders", orderRouter);
app.use("/comments", commentRouter);
app.use("/groups", groupRouter)
app.use("/users", userRouter)

app.use(
    "*",
    (error: ApiError, req: Request, res: Response, next: NextFunction) => {
        res.status(error.status || 500).send(error.message);
    },
);

process.on("uncaughtException", (error) => {
    console.error("uncaughtException", error.message, error.stack);
    process.exit(1);
});

app.listen(configs.APP_PORT, async () => {
    await mongoose.connect(configs.MONGO_URI);
    console.log(
        `Server is running on ${configs.FRONT_URL}`,
    );
});