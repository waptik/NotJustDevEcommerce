import express, { json, urlencoded } from "express";

import productsRouter from "./routes/products";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
    res.send(`Hello World with port from env file!${process.env.PORT}`);
});

app.use("/products", productsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
