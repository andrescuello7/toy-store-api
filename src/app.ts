import express from "express";
import UsersRouter from "./users/usersRouter";
import AuthRouter from "./auth/authRouter";
import ProductsRouter from "./products/productsRouter";
import PaymentsRouter from "./payments/paymentsRouter";
import bodyParser from "body-parser";
import cors from "cors";

export class App {
  private app = express();
  private port: number = 4000;

  settings() {
    this.app.set("port", process.env.PORT || this.port);
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api/users", UsersRouter);
    this.app.use("/api/auth", AuthRouter);
    this.app.use("/api/product", ProductsRouter);
    this.app.use("/api/payment", PaymentsRouter);
  }

  listen() {
    this.app.listen(this.app.get("port"), () => {
      console.log("server listening on", this.app.get("port"));
    });
  }
}
