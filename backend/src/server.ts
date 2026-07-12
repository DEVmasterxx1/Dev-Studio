import express from "express";
import cors from "cors";
import testRoutes from "./routes/test";
import { connectDB } from "./db/connect";

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", testRoutes);

// Test route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from TypeScript backend with middleware!" });
});

app.listen(3001, () => {
    console.log("Backend running on port 3001");
});