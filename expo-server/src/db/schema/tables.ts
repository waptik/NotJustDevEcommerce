import {
    doublePrecision,
    integer,
    pgTable,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    image: varchar({ length: 255 }),
    price: doublePrecision().notNull(),
});

export const ordersTable = pgTable("orders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    status: varchar({ length: 50 }).notNull().default("New"),

    // relationships
    userId: integer().references(() => usersTable.id).notNull(),

    // timestamps
    createdAt: timestamp().notNull().defaultNow(),
});

export const orderItemsTable = pgTable("order_items", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    quantity: integer().notNull(),
    price: doublePrecision().notNull(),

    // relationships
    productId: integer().references(() => productsTable.id).notNull(),
    orderId: integer().references(() => ordersTable.id).notNull(),

    // timestamps
    createdAt: timestamp().notNull().defaultNow(),
});

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    // profile
    name: varchar({ length: 255 }).notNull(),
    address: text(),

    // auth
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    role: varchar({ length: 255 }).notNull().default("user"),
});
