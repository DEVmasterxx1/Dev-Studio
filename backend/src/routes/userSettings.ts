import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

const router = Router();

// Auth middleware
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

// UPDATE USERNAME
router.put("/username", auth, async (req, res) => {
    const { username } = req.body;

    if (!username) return res.status(400).json({ message: "Username required" });

    const user = await User.findByIdAndUpdate(
        req.userId,
        { username },
        { new: true }
    ).select("-password");

    res.json(user);
});

// UPDATE EMAIL
router.put("/email", auth, async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findByIdAndUpdate(
        req.userId,
        { email },
        { new: true }
    ).select("-password");

    res.json(user);
});

// UPDATE PASSWORD
router.put("/password", auth, async (req, res) => {
    const { password } = req.body;

    if (!password) return res.status(400).json({ message: "Password required" });

    const hashed = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(req.userId, { password: hashed });

    res.json({ message: "Password updated" });
});

// DELETE ACCOUNT
router.delete("/", auth, async (req, res) => {
    await User.findByIdAndDelete(req.userId);
    res.json({ message: "Account deleted" });
});

export default router;
