import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "some-secret";

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "Access denied" });
        return;
    }

    try {
        const decoded = jwt.verify(authHeader, SECRET_KEY) as {
            userId: number;
            role: string;
        };

        if (!decoded.userId) {
            res.status(401).json({ error: "Access denied" });
            return;
        }

        req.userId = decoded.userId;
        req.role = decoded.role;

        next();
    } catch (error) {
        res.status(401).json({ error: "Access denied" });
        return;
    }
}

async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
    const role = req.role;

    if (role !== "admin") {
        res.status(401).json({ error: "Access denied. You are not an admin" });
        return;
    }

    next();
}

async function verifySeller(req: Request, res: Response, next: NextFunction) {
    const role = req.role;
    console.log("[verifySeller] role:", role);

    if (role !== "seller") {
        res.status(401).json({ error: "Access denied. You are not a seller" });
        return;
    }

    next();
}

export { verifyAdmin, verifySeller, verifyToken };
