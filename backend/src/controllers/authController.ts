import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { users } from "../models/User";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existing = users.find((u) => u.email === email);
    if (existing) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: hashed,
    };

    users.push(newUser);

    const token = generateToken(newUser.id);

    res.json({ token });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);

    res.json({ token });
};
