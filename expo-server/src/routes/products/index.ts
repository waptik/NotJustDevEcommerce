import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    listProducts,
    updateProduct,
} from "./productsController";

const router = Router();

router.get("/", listProducts);
router.post("/", createProduct);

router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
