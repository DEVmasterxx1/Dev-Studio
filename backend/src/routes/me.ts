import { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = Router();

router.get("/me", async (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, "devstudio-secret");

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Token error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
