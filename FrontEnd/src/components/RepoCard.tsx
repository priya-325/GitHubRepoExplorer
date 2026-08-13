import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { GitHubRepo } from "../types/repo";
import api from "../services/api";
import axios from "axios";

interface RepoCardProps {
  repo: GitHubRepo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      await api.post("/user/favorites", {
        githubRepoId: repo.id,
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        owner: repo.owner.login,
      });

      setMessage("Saved");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setMessage("Already saved");
        } else {
          setMessage("Could not save");
        }
      } else {
        setMessage("Could not save");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">{repo.name}</h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {repo.language || "Unknown"}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {repo.description || "No description available"}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
        <span>⭐</span>
        <span>{repo.stargazers_count.toLocaleString()}</span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View Repository →
        </a>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {message && (
        <p className="mt-3 text-right text-sm font-medium text-slate-500">
          {message}
        </p>
      )}
    </article>
  );
}
