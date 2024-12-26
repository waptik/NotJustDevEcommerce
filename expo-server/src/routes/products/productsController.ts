import type { Request, Response } from "express";
import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
    try {
        const products = await db.select().from(productsTable).execute();

        res.json(products);
    } catch (e) {
        const error = e as Error;
        console.error("[listProducts] message:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const product = await db.select().from(productsTable).where(
            eq(productsTable.id, id),
        ).execute();

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.json(product);
    } catch (e) {
        const error = e as Error;
        console.error("[getProductById] message:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function createProduct(req: Request, res: Response) {
    console.log("[createProduct] req.body:", req.body);

    try {
        const [product] = await db.insert(productsTable).values(req.body)
            .returning();

        res.status(201).json(product);
    } catch (e) {
        const error = e as Error;
        console.error("[createProduct] message:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        console.log("[updateProduct] id:", id);

        const [product] = await db.update(productsTable).set(req.body).where(
            eq(productsTable.id, id),
        ).returning();

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.json(product);
    } catch (e) {
        const error = e as Error;
        console.error("[updateProduct] message:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const [product] = await db.delete(productsTable).where(
            eq(productsTable.id, id),
        ).returning();

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.json(product);
    } catch (e) {
        const error = e as Error;
        console.error("[deleteProduct] message:", error);
        res.status(500).json({ message: error.message });
    }
}
