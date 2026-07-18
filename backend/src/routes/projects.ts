import { Router } from "express";
import jwt from "jsonwebtoken";
import { Project } from "../models/Project";

const router = Router();

// Middleware to extract user ID from token
function auth(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "No token provided" });

  try {
    const token = auth.split(" ")[1];
    const decoded: any = jwt.verify(token, "devstudio-secret");
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// CREATE PROJECT
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      owner: req.userId,
      title,
      description
    });

    res.json(project);
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ message: "Failed to create project" });
  }
});

// GET ALL PROJECTS FOR USER
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.userId });
    res.json(projects);
  } catch (err) {
    console.error("Fetch projects error:", err);
    res.status(500).json({ message: "Failed to load projects" });
  }
});

// DELETE PROJECT
router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error("Delete project error:", err);
    res.status(500).json({ message: "Failed to delete project" });
  }
});

export default router;
