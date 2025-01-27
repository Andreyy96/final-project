import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import {configs} from "./configs/config";
import {orderRouter} from "./routers/order.router";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/orders", orderRouter);

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