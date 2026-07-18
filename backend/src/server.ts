import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import projectRoutes from "./routes/projects";
import userSettingsRoutes from "./routes/userSettings";
import { connectDB } from "./db/connect";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/settings", userSettingsRoutes);

app.get("/", (req, res) => {
    res.send("Dev-Studio Backend Running");
});

app.listen(3001, () => {
    console.log("Backend running on port 3001");
});
