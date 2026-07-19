import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Project } from "../models/Project";

const router = Router();

// Extract user ID from token
function auth(req: any, res: any, next: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    try {
        const token = authHeader.split(" ")[1];
        const decoded: any = jwt.verify(token, "devstudio-secret");
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

// GET /api/user/me
router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to load user" });
    }
});

// UPDATE PROFILE (username + email)
router.put("/update-profile", auth, async (req, res) => {
    try {
        const { username, email } = req.body;

        const updated = await User.findByIdAndUpdate(
            req.userId,
            { username, email },
            { new: true }
        ).select("-password");

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update profile" });
    }
});

// UPDATE PASSWORD
router.put("/update-password", auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) return res.status(400).json({ message: "Incorrect current password" });

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        res.json({ message: "Password updated" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update password" });
    }
});

// DELETE ACCOUNT
router.delete("/delete-account", auth, async (req, res) => {
    try {
        await Project.deleteMany({ owner: req.userId });
        await User.findByIdAndDelete(req.userId);

        res.json({ message: "Account deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete account" });
    }
});

export default router;

