import { Router } from "express";
import {
    createOrder,
    getOrderById,
    listOrders,
    updateOrder,
} from "./ordersController.js";
import { verifyToken } from "@/middlwares/authMiddleware.js";
import { validateData } from "@/middlwares/validationMiddleware.js";
import {
    insertOrderWithItemsSchema,
    updateOrderSchema,
} from "@/db/validations.js";

const router = Router();

router.get("/", verifyToken, listOrders);
router.post(
    "/",
    verifyToken,
    validateData(insertOrderWithItemsSchema),
    createOrder,
);

router.get("/:id", verifyToken, getOrderById);
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
