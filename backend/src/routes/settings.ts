import { Router } from "express";
import bcrypt from "bcryptjs";
import { auth, AuthRequest } from "../middleware/auth";
import { User } from "../models/User";

const router = Router();

// UPDATE USERNAME
router.put("/username", auth, async (req: AuthRequest, res, next) => {
    try {
        const { username } = req.body;
        if (!username) return res.status(400).json({ message: "Username required" });

        const user = await User.findByIdAndUpdate(req.userId, { username }, { new: true }).select("-password");
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// UPDATE EMAIL
router.put("/email", auth, async (req: AuthRequest, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email required" });

        const user = await User.findByIdAndUpdate(req.userId, { email }, { new: true }).select("-password");
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// UPDATE PASSWORD
router.put("/password", auth, async (req: AuthRequest, res, next) => {
    try {
        const { password } = req.body;
        if (!password) return res.status(400).json({ message: "Password required" });

        const hashed = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(req.userId, { password: hashed });
        res.json({ message: "Password updated" });
    } catch (err) {
        next(err);
    }
});

// DELETE ACCOUNT
router.delete("/", auth, async (req: AuthRequest, res, next) => {
    try {
        await User.findByIdAndDelete(req.userId);
        res.json({ message: "Account deleted" });
    } catch (err) {
        next(err);
    }
});

export default router;
