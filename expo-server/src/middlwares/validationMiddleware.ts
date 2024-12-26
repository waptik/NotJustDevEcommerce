import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

export function validateData(schema: z.ZodObject<z.ZodRawShape>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);

            req.cleanBody = Object.keys(schema.shape).reduce(
                (acc: Record<string, unknown>, key) => {
                    if (key in req.body) {
                        acc[key] = req.body[key];
                    }
                    return acc;
                },
                {},
            );
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
