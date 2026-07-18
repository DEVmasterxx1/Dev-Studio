import "./index.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">Dev‑Studio</h1>
        <p className="text-gray-400 text-lg">
          Your full‑stack TypeScript platform.
        </p>

        <div className="space-x-4">
          <a
            href="/login"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

