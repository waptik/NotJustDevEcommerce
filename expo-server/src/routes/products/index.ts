import { Router } from "express";
import { z } from "zod";

import {
    createProduct,
    deleteProduct,
    getProductById,
    listProducts,
    updateProduct,
} from "./productsController";
import { validateData } from "@/middlwares/validationMiddleware";
import { createProductSchema, updateProductSchema } from "@/db/validations";
import { verifySeller, verifyToken } from "@/middlwares/authMiddleware";

const router = Router();

router.get("/", listProducts);
router.post(
    "/",
    verifyToken,
    verifySeller,
    validateData(createProductSchema),
    createProduct,
);

router.get("/:id", getProductById);
router.put(
    "/:id",
    verifyToken,
    verifySeller,
    validateData(updateProductSchema),
    updateProduct,
);
router.delete("/:id", verifyToken, verifySeller, deleteProduct);

export default router;
