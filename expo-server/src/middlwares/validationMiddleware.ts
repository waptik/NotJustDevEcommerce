import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validateData(schema: z.ZodSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = schema.parse(req.body);
            req.body = data;
            next();
        } catch (e) {
            if (e instanceof z.ZodError) {
                const details = e.errors.map((error) => ({
                    message: `${error.message} at ${error.path.join(".")}`,
                }));
                res.status(400).json({ error: "Invalid data", details });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    };
}
