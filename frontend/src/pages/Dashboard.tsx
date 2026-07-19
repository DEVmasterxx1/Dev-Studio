import { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function loadProjects() {
    const response = await api.get("/projects");
    setProjects(response.data);
  }

  async function createProject(e: React.FormEvent) {
    e.preventDefault();

    await api.post("/projects", {
      title,
      description,
    });

    setTitle("");
    setDescription("");
    loadProjects();
  }

  async function deleteProject(id: string) {
    await api.delete(`/projects/${id}`);
    loadProjects();
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Your Projects</h1>
      <div className="flex justify-end mb-4">
        <a
          href="/settings"
          className="text-blue-400 hover:underline"
        >
          Settings
        </a>
      </div>


      <form onSubmit={createProject} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700"
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          Create Project
        </button>
      </form>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-4 bg-gray-800 rounded border border-gray-700 flex justify-between"
          >
            <div>
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="text-gray-400">{project.description}</p>
            </div>

            <button
              onClick={() => deleteProject(project._id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
