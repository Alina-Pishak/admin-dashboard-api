import { Router } from "express";
import { createProduct, deleteProduct, filterProducts, getAllProducts, updateProduct } from "../controllers/productСontroller";


const router = Router();

router.get("/all", getAllProducts);

router.get("/", filterProducts);

router.post("/", createProduct);

router.put("/:productId", updateProduct);

router.delete("/:productId", deleteProduct);

export default router;
