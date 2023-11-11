import { Router } from "express";
import { postUsers, getUsers, putUsers, deleteUsers } from "./usersController";

const router: Router = Router();

router.get("/", getUsers);
router.post("/", postUsers);
router.put("/:id", putUsers);
router.delete("/:id", deleteUsers);

export default router;
