import { Router } from "express";

import {
    createProduct,
    deleteProduct,
    getProductById,
    listProducts,
    updateProduct,
} from "./productsController.js";
import { validateData } from "../../middlwares/validationMiddleware.js";
import {
    createProductSchema,
    updateProductSchema,
} from "../../db/validations.js";
import { verifySeller, verifyToken } from "../../middlwares/authMiddleware.js";

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
