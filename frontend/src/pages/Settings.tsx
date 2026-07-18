import { useState } from "react";
import { api } from "../api";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function updateUsername(e: any) {
    e.preventDefault();
    await api.put("/settings/username", { username });
    alert("Username updated");
  }

  async function updateEmail(e: any) {
    e.preventDefault();
    await api.put("/settings/email", { email });
    alert("Email updated");
  }

  async function updatePassword(e: any) {
    e.preventDefault();
    await api.put("/settings/password", { password });
    alert("Password updated");
  }

  async function deleteAccount() {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    await api.delete("/settings");
    localStorage.removeItem("token");
    window.location.href = "/register";
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <form onSubmit={updateUsername} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
        />
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded">
          Update Username
        </button>
      </form>

      <form onSubmit={updateEmail} className="space-y-4 mb-8">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
        />
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded">
          Update Email
        </button>
      </form>

      <form onSubmit={updatePassword} className="space-y-4 mb-8">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
        />
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded">
          Update Password
        </button>
      </form>

      <button
        onClick={deleteAccount}
        className="w-full py-2 bg-red-600 hover:bg-red-700 rounded"
      >
        Delete Account
      </button>
    </div>
  );
}
