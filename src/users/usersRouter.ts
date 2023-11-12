import { Router } from "express";
import { deleteUsers, getUser, postUsers, putUsers } from "./usersController";

const router: Router = Router();

router.get("/", getUser);
router.post("/", postUsers);
router.put("/:id", putUsers);
router.delete("/:id", deleteUsers);

export default router;
