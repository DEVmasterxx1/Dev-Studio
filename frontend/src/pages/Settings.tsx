import { useEffect, useState } from "react";
import { api } from "../api";

export default function Settings() {
  const [user, setUser] = useState<any>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function loadUser() {
    const response = await api.get("/user/me");
    setUser(response.data);
    setUsername(response.data.username);
    setEmail(response.data.email);
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();

    await api.put("/user/update-profile", {
      username,
      email,
    });

    loadUser();
    alert("Profile updated");
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();

    await api.put("/user/update-password", {
      currentPassword,
      newPassword,
    });

    setCurrentPassword("");
    setNewPassword("");
    alert("Password updated");
  }

  async function deleteAccount() {
    const confirmDelete = confirm(
      "Are you sure? This will permanently delete your account and all projects."
    );

    if (!confirmDelete) return;

    await api.delete("/user/delete-account");

    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 space-y-12">
      <h1 className="text-3xl font-bold">Account Settings</h1>

      {/* Update Profile */}
      <form onSubmit={updateProfile} className="space-y-4 bg-gray-800 p-6 rounded">
        <h2 className="text-xl font-bold mb-2">Update Profile</h2>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Username"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Email"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Save Changes
        </button>
      </form>

      {/* Update Password */}
      <form onSubmit={updatePassword} className="space-y-4 bg-gray-800 p-6 rounded">
        <h2 className="text-xl font-bold mb-2">Change Password</h2>

        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
          placeholder="Current Password"
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
          placeholder="New Password"
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          Update Password
        </button>
      </form>

      {/* Delete Account */}
      <div className="bg-gray-800 p-6 rounded">
        <h2 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h2>

        <button
          onClick={deleteAccount}
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
