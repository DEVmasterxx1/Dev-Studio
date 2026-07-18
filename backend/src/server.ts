import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import { connectDB } from "./db/connect";
connectDB();
import projectRoutes from "./routes/projects";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);

// Load authentication routes
app.use("/api/auth", authRoutes);

// Root test route
app.get("/", (req, res) => {
    res.send("Dev-Studio Backend Running");
});

app.listen(3001, () => {
    console.log("Backend running on port 3001");
});
