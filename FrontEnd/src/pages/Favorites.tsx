import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import type { FavoriteRepository } from "../types/favorite";

export default function Favorites() {
  const queryClient = useQueryClient();

  const {
    data: favorites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await api.get("/user/favorites");

      return response.data.favorites as FavoriteRepository[];
    },
  });

  async function handleDelete(id: number) {
    try {
      await api.delete(`/user/favorites/${id}`);

      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    } catch (error) {
      console.error("Delete favorite failed:", error);
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-center text-slate-500">Loading favorites...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-700">
          Could not load favorites.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          Your collection
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Favorite Repositories
        </h1>

        <p className="mt-2 text-slate-500">
          Repositories you have saved from GitHub.
        </p>
      </div>

      {favorites?.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            No favorites yet
          </h2>

          <p className="mt-2 text-slate-500">
            Search for a GitHub user and save some repositories.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites?.map((favorite) => (
            <article
              key={favorite.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{favorite.owner}</p>

                  <h2 className="mt-1 text-lg font-semibold text-slate-900">
                    {favorite.name}
                  </h2>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {favorite.language || "Unknown"}
                </span>
              </div>

              <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                {favorite.description || "No description available"}
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                <span>⭐</span>
                <span>{favorite.stars.toLocaleString()}</span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <a
                  href={favorite.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View Repository →
                </a>

                <button
                  type="button"
                  onClick={() => handleDelete(favorite.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
