import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from "drizzle-zod";
import { productsTable, usersTable } from "./schema/index.js";

export const createProductSchema = createInsertSchema(productsTable);
export const updateProductSchema = createUpdateSchema(productsTable);
export const createUserSchema = createInsertSchema(usersTable);
export const loginSchema = createSelectSchema(usersTable).pick({
    email: true,
    password: true,
});
