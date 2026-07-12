import express from "express";

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from TypeScript backend!" });
});

app.listen(3001, () => {
    console.log("Backend running on port 3001");
});