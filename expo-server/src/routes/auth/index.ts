import { createUserSchema, loginSchema } from "@/db/validations";
import { validateData } from "@/middlwares/validationMiddleware";
import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", validateData(loginSchema), async (req, res) => {
    const body = req.cleanBody;

    if (!body) {
        res.status(400).send("Invalid data");
        return;
    }

    try {
        const email = body.email as string;
        const password = body.password as string;

        const users = await db.select().from(usersTable).where(
            eq(usersTable.email, email),
        ).execute();

        if (!users.length) {
            res.status(401).json({ error: "Authentication failed" });
            return;
        }

        const [{ password: pwd, ...user }] = users;
        const isPasswordValid = await bcrypt.compare(password, pwd);

        if (!isPasswordValid) {
            res.status(401).json({ error: "Authentication failed" });
            return;
        }

        // create jwt token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            "some-secret",
            {
                expiresIn: "30d",
            },
        );

        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Internal server error");
        return;
    }
});

router.post("/register", validateData(createUserSchema), async (req, res) => {
    const body = req.cleanBody;

    try {
        if (!body) {
            res.status(400).send("Invalid data");
            return;
        }

        const email = body.email as string;
        const password = body.password as string;
        const name = body.name as string;
        const role = body.role as string | undefined;

        const hashedPassword = await bcrypt.hash(password, 10);

        const [{ password: _, ...user }] = await db.insert(usersTable).values({
            email,
            password: hashedPassword,
            name,
            role: role || "user",
        }).returning();

        res.status(201).json({ user });
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Internal server error");
        return;
    }
});

export default router;
