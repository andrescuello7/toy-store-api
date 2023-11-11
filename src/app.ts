import express from "express";
import UsersRouter from "./users/usersRouter";
import PostsRouter from "./posts/postsRouter";
import bodyParser from "body-parser";

export class App {
  private app = express();
  private port: number = 3000;

  settings() {
    this.app.set("port", process.env.PORT || this.port);
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/users", UsersRouter);
    this.app.use("/api/posts", PostsRouter);
  }

  listen() {
    this.app.listen(this.app.get("port"), () => {
      console.log("server listening on", this.app.get("port"));
    });
  }
}
