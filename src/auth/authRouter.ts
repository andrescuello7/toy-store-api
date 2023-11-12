import { Router } from "express";
import { postAuth } from "./authController";

const router: Router = Router();

router.post("/", postAuth);

export default router;