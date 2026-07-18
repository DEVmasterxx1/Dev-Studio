export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">Dev‑Studio</h1>

      <div className="space-x-4">
        <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
        <a href="/settings" className="hover:text-blue-400">Settings</a>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="hover:text-red-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
