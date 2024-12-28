import express, { json, urlencoded } from "express";
import serverless from "serverless-http";

import authRoutes from "./routes/auth/index.js";
import ordersRoutes from "./routes/orders/index.js";
import productsRoutes from "./routes/products/index.js";

const PORT = process.env.PORT || 3000;
const app = express();
const isProd = process.env.NODE_ENV === "production";

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
    res.send(`Hello World with port from env file!${process.env.PORT}`);
});

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

if (!isProd) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export const handler = serverless(app);
