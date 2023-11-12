import { Router } from "express";
import { postAuth, getAuth } from "./authController";
import { auth } from "../../src/middewares/Authentication";

const router: Router = Router();

router.get("/", auth, getAuth);
router.post("/", postAuth);

export default router;