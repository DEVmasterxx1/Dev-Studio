import { useState } from "react";
import { api } from "../api";

export default function Register() {
  const [username, setUsername] = useState("");   // FIXED
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        username,   // FIXED
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Registration failed. Try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-3xl font-bold text-center">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"     // FIXED
            value={username}           // FIXED
            onChange={(e) => setUsername(e.target.value)}   // FIXED
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
          />

          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
