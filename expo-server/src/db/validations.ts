import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { productsTable } from "./schema";
import type { z } from "zod";

export const createProductSchema = createInsertSchema(productsTable);
export const updateProductSchema = createUpdateSchema(productsTable);

type CreateProduct = z.infer<typeof updateProductSchema>;
