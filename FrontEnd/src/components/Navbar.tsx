import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  const { isAuthenticated, logout } = useAuth();

  // function handleLogout() {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // }
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-blue-600">
          GitHub Repo Explorer
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-blue-600"
                : "font-medium text-slate-600 hover:text-slate-900"
            }
          >
            Explore
          </NavLink>

          {/* {token ? ( */}
          {isAuthenticated ? (
            <>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-blue-600"
                    : "font-medium text-slate-600 hover:text-slate-900"
                }
              >
                Favorites
              </NavLink>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-blue-600"
                    : "font-medium text-slate-600 hover:text-slate-900"
                }
              >
                Login
              </NavLink>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
