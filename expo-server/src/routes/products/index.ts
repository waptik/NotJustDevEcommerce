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

const router = Router();

router.get("/", listProducts);
router.post("/", validateData(createProductSchema), createProduct);

router.get("/:id", getProductById);
router.put("/:id", validateData(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
