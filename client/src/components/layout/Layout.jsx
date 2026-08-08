import { useEffect } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { getSettings } from "../../services/settingsService";

const Layout = ({ children }) => {
  useEffect(() => {
    const applyTheme = (theme) => {
      const root = document.documentElement;

      if (theme === "Dark") {
        root.classList.add("dark");
      } else if (theme === "Light") {
        root.classList.remove("dark");
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

        root.classList.toggle(
          "dark",
          prefersDark
        );
      }
    };

    const loadTheme = async () => {
      try {
        const res = await getSettings();

        const theme =
          res.data?.settings?.theme || "System";

        applyTheme(theme);
      } catch (error) {
        console.error(
          "Unable to load theme:",
          error
        );

        // Default to light mode if settings
        // cannot be loaded.
        document.documentElement.classList.remove(
          "dark"
        );
      }
    };

    loadTheme();
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gray-100 dark:bg-slate-950">

      {/* Fixed Sidebar */}

      <aside className="fixed left-0 top-0 bottom-0 w-64 z-50">
        <Sidebar />
      </aside>

      {/* Main Application */}

      <div className="ml-64 h-screen flex flex-col">

        {/* Navbar */}

        <div className="sticky top-0 z-40 shrink-0">
          <Navbar />
        </div>

        {/* Scrollable Content */}

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;