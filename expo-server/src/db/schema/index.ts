import {
    doublePrecision,
    integer,
    pgTable,
    text,
    varchar,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    image: varchar({ length: 255 }),
    price: doublePrecision().notNull(),
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
