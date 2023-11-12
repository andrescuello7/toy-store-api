import { Router } from "express";
import { auth } from "../middewares/Authentication";
import { getAllProducts, getDescriptionProduct, postProduct } from "./productsController";

const router: Router = Router();

router.post("/",auth, postProduct);
router.get("/", getDescriptionProduct);
router.get("/getProducts", getAllProducts);

export default router;