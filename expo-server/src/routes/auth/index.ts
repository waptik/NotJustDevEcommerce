import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema/index.js";
import { createUserSchema, loginSchema } from "../../db/validations.js";
import { validateData } from "../../middlwares/validationMiddleware.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

async function generateToken(user: { id: number; role: string }) {
    return jwt.sign(
        { userId: user.id, role: user.role },
        "some-secret",
        {
            expiresIn: "30d",
        },
    );
}

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
            eq(usersTable.email, email.toLowerCase()),
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
        const token = await generateToken(user);

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
            email: email.toLowerCase(),
            password: hashedPassword,
            name,
            role: role || "user",
        }).returning();

        // create jwt token
        const token = await generateToken(user);

        res.status(201).json({ user, token });
    } catch (error) {
        console.error("Error", error);
        res.status(500).send("Internal server error");
        return;
    }
});

export default router;
