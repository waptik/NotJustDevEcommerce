import express, { json, urlencoded } from "express";

import productsRouter from "./routes/products/index.js";
import authRouter from "./routes/auth/index.js";
import serverless from "serverless-http";

const PORT = process.env.PORT || 3000;
const app = express();
const isProd = process.env.NODE_ENV === "production";

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
    res.send(`Hello World with port from env file!${process.env.PORT}`);
});

app.use("/products", productsRouter);
app.use("/auth", authRouter);

if (!isProd) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export const handler = serverless(app);
