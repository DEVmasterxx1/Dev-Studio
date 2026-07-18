import React, { useEffect, useState } from "react";
import { api } from "../api";
import CopyToken from "../components/CopyToken";

type Project = {
  _id: string;
  name: string;
  description?: string;
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/projects");
        setProjects(res.data || []);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDelete(id: string) {
    const ok = window.confirm("Delete this project? This action cannot be undone.");
    if (!ok) return;

    try {
      setDeletingId(id);
      // Call backend delete endpoint
      await api.delete(`/projects/${id}`);
      // Remove from local state
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete project. Check console for details.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <CopyToken />
          </div>
        </header>

        <section>
          {loading ? (
            <p className="text-gray-400">Loading projects…</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-400">No projects found.</p>
          ) : (
            <ul className="space-y-3">
              {projects.map((p) => (
                <li key={p._id} className="p-4 bg-gray-800 rounded flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-400">{p.description}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(p._id)}
                      disabled={deletingId === p._id}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
                      title="Delete project"
                    >
                      {deletingId === p._id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
