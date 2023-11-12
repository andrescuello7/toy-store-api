import { Router } from "express";
import { postProducts } from "./productsController";

const router: Router = Router();

router.post("/", postProducts);

export default router;