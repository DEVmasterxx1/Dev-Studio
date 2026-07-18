import jwt from "jsonwebtoken";

export function generateToken(id: string) {
    return jwt.sign({ id }, "devstudio_secret_key", { expiresIn: "30d" });
}
