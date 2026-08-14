import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-4 text-lg text-slate-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Go to Explore
          </Link>

          <Link
            to="/favorites"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            View Favorites
          </Link>
        </div>
      </div>
    </main>
  );
}
