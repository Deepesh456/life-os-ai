import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { getSettings } from "../../services/settingsService";

const Layout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

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

        document.documentElement.classList.remove(
          "dark"
        );
      }
    };

    loadTheme();
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gray-100 dark:bg-slate-950">

      {/* =========================
          DESKTOP SIDEBAR
      ========================= */}

      <aside className="hidden md:block fixed left-0 top-0 bottom-0 w-64 z-50">
        <Sidebar />
      </aside>


      {/* =========================
          MOBILE SIDEBAR OVERLAY
      ========================= */}

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">

          {/* Dark overlay */}

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() =>
              setMobileSidebarOpen(false)
            }
          />

          {/* Sidebar */}

          <aside className="absolute left-0 top-0 bottom-0 w-72">
            <Sidebar />
          </aside>

        </div>
      )}


      {/* =========================
          MAIN APPLICATION
      ========================= */}

      <div className="md:ml-64 h-screen flex flex-col">

        {/* Navbar */}

        <div className="sticky top-0 z-40 shrink-0">
          <Navbar
            onMenuClick={() =>
              setMobileSidebarOpen(
                !mobileSidebarOpen
              )
            }
          />
        </div>


        {/* Scrollable Content */}

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">

          {children}

        </main>

      </div>

    </div>
  );
};

export default Layout;