import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from "drizzle-zod";
import {
    orderItemsTable,
    ordersTable,
    productsTable,
    usersTable,
} from "./schema/index.js";
import { z } from "zod";

export const createProductSchema = createInsertSchema(productsTable);
export const updateProductSchema = createUpdateSchema(productsTable);
export const createUserSchema = createInsertSchema(usersTable);
export const loginSchema = createSelectSchema(usersTable).pick({
    email: true,
    password: true,
});

// Orders
export const insertOrderSchema = createInsertSchema(ordersTable).omit({
    createdAt: true,
    userId: true,
    status: true,
});
export const updateOrderSchema = createUpdateSchema(ordersTable).pick({
    status: true,
});
export const getOrderSchema = createSelectSchema(ordersTable);
export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
    orderId: true,
});
const insertOrderItemsSchema = z.array(insertOrderItemSchema);
export const insertOrderWithItemsSchema = z.object({
    items: insertOrderItemsSchema,
});
const updateOrderItemSchema = createUpdateSchema(orderItemsTable).omit({
    orderId: true,
});
export const updateOrderItemsSchema = z.array(updateOrderItemSchema);

export type UpdateOrderSchema = z.infer<typeof updateOrderSchema>;
export type UpdateOrderItemsSchema = z.infer<typeof updateOrderItemsSchema>;
export type GetOrderSchema = z.infer<typeof getOrderSchema>;
export type InsertOrderWithItemsSchema = z.infer<
    typeof insertOrderWithItemsSchema
>;
