import { Router } from "express";
import { auth } from "../middewares/Authentication";
import { postUsers, getUsers, putUsers, deleteUsers } from "./usersController";

const router: Router = Router();

router.get("/", getUsers);
router.post("/", auth, postUsers);
router.put("/:id", putUsers);
router.delete("/:id", deleteUsers);

export default router;
