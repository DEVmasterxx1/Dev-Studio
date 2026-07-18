import Navbar from "../components/Navbar";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold">Settings</h1>

        <p className="text-gray-400 mt-4">
          User settings will be added in Phase 7 — including profile editing,
          password updates, and account preferences.
        </p>

        <div className="mt-10 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <p className="text-gray-400">
            This page is fully wired into your routing system and ready for
            expansion.
          </p>
        </div>
      </div>
    </div>
  );
}
