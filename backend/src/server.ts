import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import projectRoutes from "./routes/projects";

const app = express();

// CORS
app.use(
    cors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: true,
    })
);

// JSON parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);

// MongoDB connection
async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/devstudio");
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
}

connectDB();

// Start server
app.listen(3001, () => {
    console.log("Backend running on port 3001");
});
