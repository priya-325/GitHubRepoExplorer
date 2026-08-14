import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getReposByUsername } from "../services/github";
import RepoCard from "../components/RepoCard";
import RepoCardSkeleton from "../components/RepoCardSkeleton";

export default function Explore() {
  const [username, setUsername] = useState("");
  const [searchUsername, setSearchUsername] = useState("");

  const {
    data: repos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["repos", searchUsername],
    queryFn: () => getReposByUsername(searchUsername),
    enabled: !!searchUsername,
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const value = username.trim();

    if (!value) return;

    setSearchUsername(value);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="mx-auto max-w-3xl text-center">
        <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          Discover GitHub repositories
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Explore repositories by
          <span className="text-blue-600"> GitHub username</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Search any GitHub user, browse their public repositories, and save
          your favorites.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row"
        >
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </section>

      {isLoading && (
        <section className="mt-14">
          <div className="mb-6">
            <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-7 w-44 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <RepoCardSkeleton key={index} />
            ))}
          </div>
        </section>
      )}

      {isError && (
        <div className="mx-auto mt-12 max-w-xl rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
          User not found or GitHub API request failed.
        </div>
      )}

      {repos && repos.length > 0 && (
        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
                Search results
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {searchUsername}
              </h2>
            </div>

            <p className="text-sm text-slate-500">
              {repos.length} repositories
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </section>
      )}

      {repos && repos.length === 0 && searchUsername && !isLoading && (
        <div className="mt-14 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            No repositories found
          </h2>

          <p className="mt-2 text-slate-500">
            This GitHub user does not have any public repositories.
          </p>
        </div>
      )}
    </main>
  );
}
