import { Router } from "express";
import jwt from "jsonwebtoken";
import { Project } from "../models/Project";

const router = Router();

// Create project
router.post("/", async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token provided" });
    const token = auth.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "devstudio-secret");
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });
    const project = await Project.create({ name, description, owner: decoded.id });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// Delete project (owner-checked)
router.delete("/:id", async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token provided" });
    const token = auth.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "devstudio-secret");
    const project = await Project.findOneAndDelete({ _id: req.params.id, owner: decoded.id });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Deleted", project });
  } catch (err) {
    next(err);
  }
});

export default router;
