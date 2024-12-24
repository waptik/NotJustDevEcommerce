import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    res.send(`Hello World with port from env file!${process.env.PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
