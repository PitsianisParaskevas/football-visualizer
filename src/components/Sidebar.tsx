import { NavLink } from "react-router";
import { navigation } from "../config/navigation";

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-neutral-800 bg-neutral-950 p-4">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white">
          Football Visualizer
        </h1>
        <p className="text-sm text-neutral-400">Documentation</p>
      </div>

      <nav className="flex flex-col gap-1">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              [
                "rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "text-neutral-300 hover:bg-neutral-900 hover:text-white",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
