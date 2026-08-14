import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/login");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-medium text-blue-600"
      : "font-medium text-slate-600 transition hover:text-slate-900";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-18 items-center justify-between">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
          >
            GitHub Repo Explorer
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={navLinkClass}>
              Explore
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink to="/favorites" className={navLinkClass}>
                  Favorites
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
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

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="rounded-lg border border-slate-300 p-2 text-slate-700 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile */}
        {menuOpen && (
          <nav className="space-y-3 border-t border-slate-200 py-4 md:hidden">
            <NavLink
              to="/"
              onClick={closeMenu}
              className="block rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
            >
              Explore
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/favorites"
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
                >
                  Favorites
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left font-medium text-slate-700 hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
                >
                  Login
                </NavLink>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="block rounded-lg bg-blue-600 px-3 py-2 text-center font-medium text-white hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
