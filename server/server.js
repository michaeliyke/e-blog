import express, { json } from "express";
import postRouter from "./routes/PostRouter.js";
import userRouter from "./routes/UserRouter.js";
import likeRouter from "./routes/LikeRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/AuthRouter.js";
import tagRouter from "./routes/TagRouter.js";
import commentRouter from "./routes/CommentsRouter.js";
import replyRouter from "./routes/ReplyRouter.js";
import { connectToDB } from "./engine/db.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

const app = express();
app.use(json());
app.use(cookieParser());

// allow cors to enable cross origin requests from port 5000
app.use(
  cors({
    origin: "http://127.0.0.1:5000",
    credentials: true,
  })
);

// check the status of the server
app.get("/status", (req, res) => {
  return res.status(200).json({ status: "OK" });
});

// the blogs route
app.use("/users", userRouter);
app.use("/blogs", postRouter);
app.use("/likes", likeRouter);
app.use("/auth", authRouter);
app.use("/tags", tagRouter);
app.use("/comments", commentRouter);
app.use("/replies", replyRouter);

connectToDB().then(() => {
  // express server start after the database starts successfuly
  app.listen(PORT, HOST, () => {
    console.log("Server is running!");
  });
});
