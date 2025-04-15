import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { commentRouter } from "./routers/comment.router";
import { groupRouter } from "./routers/group.router";
import { orderRouter } from "./routers/order.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/orders", orderRouter);
app.use("/comments", commentRouter);
app.use("/groups", groupRouter);
app.use("/users", userRouter);

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
const dbConnection = async () => {
  let dbCon = false;

  while (!dbCon) {
    try {
      console.log("Connecting to DB...");
      await mongoose.connect(configs.MONGO_URI);
      dbCon = true;
      console.log("Database available!!!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log("Database unavailable, wait 3 seconds");
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};

const start = async () => {
  try {
    await dbConnection();
    app.listen(configs.APP_PORT, () => {
      console.log(
        `Server listening on ${configs.APP_HOST}:${configs.APP_PORT}`,
      );
    });
  } catch (e) {
    console.log(e);
  }
};

start();
