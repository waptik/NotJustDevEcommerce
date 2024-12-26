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

const router = Router();

const createProductSchema = z.object({
    name: z.string().nonempty(),
    price: z.number({ message: "Price must be a number" }).positive(),
    description: z.string().optional(),
});

router.get("/", listProducts);
router.post("/", validateData(createProductSchema), createProduct);

router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
