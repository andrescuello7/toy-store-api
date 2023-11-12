import { Router } from "express";
import { getDescriptionProduct, postProducts } from "./productsController";

const router: Router = Router();

router.post("/", postProducts);
router.get("/", getDescriptionProduct);

export default router;