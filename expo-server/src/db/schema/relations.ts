import { relations } from "drizzle-orm";
import { orderItemsTable, ordersTable } from "./tables.js";

export const ordersRelations = relations(ordersTable, ({ many }) => ({
    items: many(orderItemsTable),
}));

export const orderItemsRelations = relations(orderItemsTable, ({ one }) => ({
    order: one(ordersTable, {
        fields: [orderItemsTable.orderId],
        references: [ordersTable.id],
    }),
}));
