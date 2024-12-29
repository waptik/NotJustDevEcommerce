import type { Request, Response } from "express";

import { db } from "../../db/index.js";
import {
    orderItemsTable,
    ordersTable,
    productsTable,
} from "../../db/schema/index.js";
import type {
    GetOrderSchema,
    InsertOrderItemsWithPriceSchema,
    InsertOrderWithItemsSchema,
    UpdateOrderSchema,
} from "../../db/validations.js";
import { eq } from "drizzle-orm";

export async function createOrder(req: Request, res: Response) {
    const userId = req.userId;
    console.log("[createOrder] userId:", userId);

    if (!userId) {
        res.status(401).json({ error: "Invalid user" });
        return;
    }

    const cleanBody = req.cleanBody;
    console.log("[createOrder] cleanBody:", cleanBody);
    const items = cleanBody?.items as
        | InsertOrderWithItemsSchema["items"]
        | undefined;

    if (!cleanBody || !items?.length) {
        res.status(400).json({ error: "Invalid data" });
        return;
    }

    const orderItemsWithPrice: InsertOrderItemsWithPriceSchema["items"] = [];

    try {
        for (const item of items) {
            const [product] = await db.select().from(productsTable).where(
                eq(productsTable.id, item.productId),
            ).execute();

            if (!product) {
                res.status(400).json({ error: "Invalid product" });
                return;
            }

            orderItemsWithPrice.push({
                ...item,
                price: product.price * item.quantity,
            });
        }

        if (!orderItemsWithPrice.length) {
            res.status(400).json({ error: "Invalid data" });
            return;
        }

        const [newOrder] = await db.insert(ordersTable).values({
            userId,
        })
            .returning();
        console.log("[createOrder] order:", newOrder);

        const orderItems = orderItemsWithPrice.map((item) => ({
            ...item,
            orderId: newOrder.id,
        }));
        console.log("[createOrder] orderItems:", orderItems);

        const newOrderItems = await db.insert(orderItemsTable).values(
            orderItems,
        ).returning();

        res.status(201).json({ order: newOrder, items: newOrderItems });
    } catch (e) {
        const error = e as Error;
        console.error("[createOrder] message:", error);
        res.status(500).json({ message: "Invalid order data" });
    }
}

export async function listOrders(req: Request, res: Response) {
    try {
        const role = req.role;
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ error: "Invalid user" });
            return;
        }

        let orders: GetOrderSchema[] = [];

        switch (role) {
            case "admin":
                orders = await db.select().from(ordersTable).execute();
                break;

            default:
                orders = await db
                    .select()
                    .from(ordersTable)
                    .where(eq(ordersTable.userId, userId))
                    .execute();
                break;
        }

        res.json(orders);
    } catch (e) {
        const error = e as Error;
        console.error("[listOrders] message:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getOrderById(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        const orderWithItems = await db.query.ordersTable.findFirst({
            where: (table, { eq }) => eq(table.id, id),
            with: {
                items: true,
            },
        });

        if (!orderWithItems) {
            res.status(404).json({ error: "Order not found" });
            return;
        }

        res.json({ orderWithItems });
    } catch (e) {
        const error = e as Error;
        console.error("[getOrderById] message:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function updateOrder(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        console.log("[updateOrder] id:", { id, fields: req.body });
        const order = await db.query.ordersTable.findFirst({
            where: (table, { eq }) => eq(table.id, id),
        });

        const orderData = req.cleanBody as UpdateOrderSchema | undefined;

        if (!orderData || !order) {
            res.status(404).json({ error: "Order not found" });
            return;
        }

        const [updatedOrder] = await db.update(ordersTable).set(orderData)
            .where(
                eq(ordersTable.id, id),
            ).returning();

        res.json({ order: updatedOrder });
    } catch (e) {
        const error = e as Error;
        console.error("[updateOrder] message:", error);
        res.status(500).json({ message: error.message });
    }
}
