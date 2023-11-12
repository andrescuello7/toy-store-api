import { Router } from "express";
import { postPayments } from "./paymentsController";
import { auth } from "../../src/middewares/Authentication";

const router: Router = Router();

router.post("/", auth, postPayments);

export default router;