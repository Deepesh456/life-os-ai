import { useEffect, useRef, useState } from "react";

import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaTimes,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaBullseye,
  FaWallet,
  FaHeartbeat,
  FaStickyNote,
  FaUsers,
  FaHome,
  FaBars,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { getDashboardData } from "../../services/dashboardService";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  // =========================
  // REFS
  // =========================

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // =========================
  // STATE
  // =========================

  const [notifications, setNotifications] =
    useState([]);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const [showProfileModal, setShowProfileModal] =
    useState(false);

  const [loadingNotifications, setLoadingNotifications] =
    useState(true);

  const [user, setUser] = useState({
    name: "Deepesh",
    email: "",
  });

  const [searchQuery, setSearchQuery] =
    useState("");

  const [showSearchResults, setShowSearchResults] =
    useState(false);

  const [selectedSearchIndex, setSelectedSearchIndex] =
    useState(0);

  // =========================
  // SEARCH MODULES
  // =========================

  const searchModules = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FaHome,
      keywords: [
        "dashboard",
        "home",
        "overview",
      ],
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: FaCalendarAlt,
      keywords: [
        "calendar",
        "schedule",
        "events",
      ],
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: FaCheckCircle,
      keywords: [
        "tasks",
        "task",
        "todo",
        "to do",
      ],
    },
    {
      name: "Goals",
      path: "/goals",
      icon: FaBullseye,
      keywords: [
        "goals",
        "goal",
        "targets",
        "progress",
      ],
    },
    {
      name: "Finance",
      path: "/finance",
      icon: FaWallet,
      keywords: [
        "finance",
        "money",
        "expense",
        "expenses",
        "income",
        "budget",
      ],
    },
    {
      name: "Health",
      path: "/health",
      icon: FaHeartbeat,
      keywords: [
        "health",
        "wellness",
        "fitness",
        "exercise",
      ],
    },
    {
      name: "Notes",
      path: "/notes",
      icon: FaStickyNote,
      keywords: [
        "notes",
        "note",
        "documents",
      ],
    },
    {
      name: "Meetings",
      path: "/meetings",
      icon: FaUsers,
      keywords: [
        "meetings",
        "meeting",
        "agenda",
      ],
    },
    {
      name: "Settings",
      path: "/settings",
      icon: FaCog,
      keywords: [
        "settings",
        "setting",
        "preferences",
        "configuration",
      ],
    },
  ];

  // =========================
  // FILTER SEARCH
  // =========================

  const filteredModules =
    searchQuery.trim() === ""
      ? []
      : searchModules.filter((module) => {
          const query =
            searchQuery.toLowerCase().trim();

          return (
            module.name
              .toLowerCase()
              .includes(query) ||
            module.keywords.some((keyword) =>
              keyword
                .toLowerCase()
                .includes(query)
            )
          );
        });

  // =========================
  // LOAD USER
  // =========================

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        const parsedUser =
          JSON.parse(storedUser);

        setUser({
          name:
            parsedUser.name ||
            parsedUser.username ||
            "Deepesh",

          email:
            parsedUser.email || "",
        });
      }
    } catch (error) {
      console.error(
        "Unable to load user profile:",
        error
      );
    }
  }, []);

  // =========================
  // LOAD NOTIFICATIONS
  // =========================

  const loadNotifications = async () => {
    try {
      const res = await getDashboardData();

      const todayEvents =
        res.data.todayEvents || [];

      const pendingTasks =
        res.data.pendingTasks || [];

      const activeGoals =
        res.data.activeGoals || [];

      const recentTransactions =
        res.data.recentTransactions || [];

      const newNotifications = [];

      if (pendingTasks.length > 0) {
        const highPriorityTasks =
          pendingTasks.filter(
            (task) =>
              task.priority?.toLowerCase() ===
              "high"
          );

        if (highPriorityTasks.length > 0) {
          newNotifications.push({
            id: "high-priority-task",
            icon: "⚠️",
            title: "High Priority Tasks",
            message: `You have ${
              highPriorityTasks.length
            } high-priority task${
              highPriorityTasks.length > 1
                ? "s"
                : ""
            } pending.`,
          });
        } else {
          newNotifications.push({
            id: "pending-tasks",
            icon: "✅",
            title: "Pending Tasks",
            message: `You have ${
              pendingTasks.length
            } pending task${
              pendingTasks.length > 1
                ? "s"
                : ""
            }.`,
          });
        }
      }

      if (todayEvents.length > 0) {
        const nextEvent = todayEvents[0];

        newNotifications.push({
          id: "today-events",
          icon: "📅",
          title: "Today's Schedule",
          message: `${
            todayEvents.length
          } event${
            todayEvents.length > 1
              ? "s"
              : ""
          } scheduled today${
            nextEvent?.title
              ? ` • Next: ${nextEvent.title}`
              : ""
          }.`,
        });
      }

      if (activeGoals.length > 0) {
        newNotifications.push({
          id: "active-goals",
          icon: "🎯",
          title: "Goal Reminder",
          message: `You have ${
            activeGoals.length
          } active goal${
            activeGoals.length > 1
              ? "s"
              : ""
          }. Keep making progress today!`,
        });
      }

      const recentExpenses =
        recentTransactions
          .filter(
            (transaction) =>
              transaction.type === "Expense"
          )
          .reduce(
            (sum, transaction) =>
              sum +
              Number(
                transaction.amount || 0
              ),
            0
          );

      if (recentExpenses >= 5000) {
        newNotifications.push({
          id: "expense-alert",
          icon: "💰",
          title: "Spending Alert",
          message: `Your recent expenses total ₹${recentExpenses.toLocaleString(
            "en-IN"
          )}. Consider reviewing your spending.`,
        });
      }

      if (newNotifications.length === 0) {
        newNotifications.push({
          id: "welcome",
          icon: "🔔",
          title: "Welcome to Life OS AI",
          message:
            "Your dashboard is ready.",
        });
      }

      setNotifications(
        newNotifications
      );
    } catch (error) {
      console.error(
        "Failed to load notifications:",
        error
      );

      setNotifications([
        {
          id: "welcome",
          icon: "🔔",
          title: "Welcome to Life OS AI",
          message:
            "Your dashboard is ready.",
        },
      ]);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(
      loadNotifications,
      60000
    );

    return () =>
      clearInterval(interval);
  }, []);

  // =========================
  // OUTSIDE CLICK
  // =========================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target
        )
      ) {
        setShowSearchResults(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setShowProfileMenu(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================
  // SEARCH
  // =========================

  const openSearchResult = (module) => {
    navigate(module.path);

    setSearchQuery("");
    setShowSearchResults(false);
    setSelectedSearchIndex(0);
  };

  const handleSearchKeyDown = (event) => {
    if (!showSearchResults) {
      if (event.key === "Enter") {
        if (filteredModules.length > 0) {
          openSearchResult(
            filteredModules[0]
          );
        }
      }

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setSelectedSearchIndex((prev) =>
        prev < filteredModules.length - 1
          ? prev + 1
          : 0
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setSelectedSearchIndex((prev) =>
        prev > 0
          ? prev - 1
          : filteredModules.length - 1
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (filteredModules.length > 0) {
        openSearchResult(
          filteredModules[
            selectedSearchIndex
          ]
        );
      }
    }

    if (event.key === "Escape") {
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setShowProfileMenu(false);
    setShowProfileModal(false);

    navigate("/login");
  };

  // =========================
  // PROFILE
  // =========================

  const handleOpenProfile = () => {
    setShowProfileMenu(false);
    setShowNotifications(false);
    setShowProfileModal(true);
  };

  const handleCloseProfile = () => {
    setShowProfileModal(false);
  };

  // =========================
  // CLOSE MOBILE MENU
  // =========================

  const handleNavigation = (path) => {
    navigate(path);

    if (onMenuClick) {
      // Do not toggle here.
      // Layout controls the sidebar.
    }
  };

  // =========================
  // RETURN
  // =========================

  return (
    <>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 relative">

        {/* =========================
            MOBILE MENU
        ========================= */}

        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden text-xl app-title p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition"
          aria-label="Open navigation menu"
        >
          <FaBars />
        </button>


        {/* =========================
            DESKTOP SPACER
        ========================= */}

        <div className="hidden md:block" />


        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="flex items-center gap-3 sm:gap-5">

          {/* =========================
              SEARCH
          ========================= */}

          <div
            ref={searchRef}
            className="relative hidden sm:block"
          >

            <div className="flex items-center app-input px-4 py-2 rounded-xl">

              <FaSearch className="app-muted mr-2" />

              <input
                type="text"
                value={searchQuery}
                placeholder="Search..."
                onChange={(event) => {
                  setSearchQuery(
                    event.target.value
                  );

                  setShowSearchResults(
                    event.target.value.trim()
                      .length > 0
                  );

                  setSelectedSearchIndex(0);
                }}
                onFocus={() => {
                  if (
                    searchQuery.trim()
                      .length > 0
                  ) {
                    setShowSearchResults(
                      true
                    );
                  }
                }}
                onKeyDown={
                  handleSearchKeyDown
                }
                className="bg-transparent outline-none app-title w-32 lg:w-40"
                aria-label="Search Life OS modules"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchResults(
                      false
                    );
                  }}
                  className="app-muted hover:text-red-500 transition ml-1"
                >
                  <FaTimes />
                </button>
              )}

            </div>


            {/* SEARCH RESULTS */}

            {showSearchResults && (
              <div className="absolute right-0 top-12 w-72 app-card rounded-xl shadow-xl border app-border z-50 overflow-hidden">

                {filteredModules.length > 0 ? (
                  <div className="py-2">

                    <p className="px-4 py-2 text-xs font-semibold app-muted uppercase">
                      Suggested Modules
                    </p>

                    {filteredModules.map(
                      (module, index) => {
                        const Icon =
                          module.icon;

                        return (
                          <button
                            key={module.path}
                            type="button"
                            onMouseEnter={() =>
                              setSelectedSearchIndex(
                                index
                              )
                            }
                            onClick={() =>
                              openSearchResult(
                                module
                              )
                            }
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left app-title transition ${
                              selectedSearchIndex ===
                              index
                                ? "bg-purple-500/10"
                                : "hover:bg-black/5 dark:hover:bg-white/5"
                            }`}
                          >

                            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">

                              <Icon className="text-purple-600" />

                            </div>

                            <div className="flex-1">

                              <p className="font-semibold">
                                {module.name}
                              </p>

                              <p className="text-xs app-muted">
                                Open {module.name}
                              </p>

                            </div>

                            {selectedSearchIndex ===
                              index && (
                              <span className="text-xs app-muted">
                                Enter
                              </span>
                            )}

                          </button>
                        );
                      }
                    )}

                  </div>
                ) : (
                  <div className="p-5 text-center">

                    <FaSearch className="mx-auto text-2xl app-muted mb-2" />

                    <p className="font-semibold app-title">
                      No results found
                    </p>

                    <p className="text-sm app-muted mt-1">
                      Try Tasks, Calendar,
                      Finance or Goals.
                    </p>

                  </div>
                )}

              </div>
            )}

          </div>


          {/* =========================
              MOBILE SEARCH
          ========================= */}

          <button
            type="button"
            className="sm:hidden p-2 app-title rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            onClick={() => {
              const query =
                window.prompt(
                  "Search Life OS AI"
                );

              if (!query) return;

              const result =
                searchModules.find(
                  (module) =>
                    module.name
                      .toLowerCase()
                      .includes(
                        query
                          .toLowerCase()
                          .trim()
                      ) ||
                    module.keywords.some(
                      (keyword) =>
                        keyword
                          .toLowerCase()
                          .includes(
                            query
                              .toLowerCase()
                              .trim()
                          )
                    )
                );

              if (result) {
                handleNavigation(
                  result.path
                );
              }
            }}
          >
            <FaSearch />
          </button>


          {/* =========================
              NOTIFICATIONS
          ========================= */}

          <div
            ref={notificationRef}
            className="relative"
          >

            <button
              type="button"
              onClick={() => {
                setShowNotifications(
                  !showNotifications
                );

                setShowProfileMenu(false);
                setShowSearchResults(false);
              }}
              className="relative p-2"
            >

              <FaBell
                className="text-xl sm:text-2xl app-title hover:text-yellow-500 transition"
              />

              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {notifications.length}
                </span>
              )}

            </button>


            {/* NOTIFICATION DROPDOWN */}

            {showNotifications && (
              <div className="absolute right-0 top-12 w-[calc(100vw-2rem)] max-w-96 app-card rounded-2xl shadow-xl border app-border z-50 overflow-hidden">

                <div className="flex items-center justify-between px-5 py-4 border-b app-border">

                  <h3 className="text-lg font-semibold app-title">
                    Notifications
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      setShowNotifications(
                        false
                      )
                    }
                    className="app-muted hover:text-red-500 transition"
                  >
                    <FaTimes />
                  </button>

                </div>

                <div className="max-h-96 overflow-y-auto">

                  {loadingNotifications ? (
                    <div className="p-6 text-center app-muted">
                      Loading notifications...
                    </div>
                  ) : (
                    notifications.map(
                      (notification) => (
                        <div
                          key={notification.id}
                          className="px-5 py-4 border-b app-border"
                        >

                          <div className="flex gap-4">

                            <div className="text-2xl">
                              {notification.icon}
                            </div>

                            <div>

                              <h4 className="font-semibold app-title">
                                {
                                  notification.title
                                }
                              </h4>

                              <p className="text-sm app-muted mt-1">
                                {
                                  notification.message
                                }
                              </p>

                            </div>

                          </div>

                        </div>
                      )
                    )
                  )}

                </div>

              </div>
            )}

          </div>


          {/* =========================
              PROFILE
          ========================= */}

          <div
            ref={profileRef}
            className="relative"
          >

            <button
              type="button"
              onClick={() => {
                setShowProfileMenu(
                  !showProfileMenu
                );

                setShowNotifications(false);
                setShowSearchResults(false);
              }}
              className="p-1"
            >

              <FaUserCircle
                className="text-3xl text-purple-600 hover:text-purple-700 transition"
              />

            </button>


            {/* PROFILE DROPDOWN */}

            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-56 app-card rounded-xl shadow-xl border app-border z-50 overflow-hidden">

                <div className="px-4 py-4 border-b app-border">

                  <div className="flex items-center gap-3">

                    <FaUserCircle className="text-3xl text-purple-600" />

                    <div className="min-w-0">

                      <p className="font-semibold app-title truncate">
                        {user.name}
                      </p>

                      <p className="text-xs app-muted">
                        Personal User
                      </p>

                    </div>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={handleOpenProfile}
                  className="w-full flex items-center gap-3 px-4 py-3 app-title hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <FaUser className="app-muted" />

                  <span>
                    Profile
                  </span>
                </button>


                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/settings");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 app-title hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  <FaCog className="app-muted" />

                  <span>
                    Settings
                  </span>
                </button>


                <div className="border-t app-border">

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                  >
                    <FaSignOutAlt />

                    <span>
                      Logout
                    </span>
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>


      {/* =========================
          PROFILE MODAL
      ========================= */}

      {showProfileModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
          onClick={handleCloseProfile}
        >

          <div
            className="app-card w-[450px] max-w-full rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold app-title">
                My Profile
              </h2>

              <button
                type="button"
                onClick={
                  handleCloseProfile
                }
                className="app-muted hover:text-red-500 transition text-xl"
              >
                <FaTimes />
              </button>

            </div>


            <div className="flex flex-col items-center mb-6">

              <FaUserCircle className="text-7xl text-purple-600" />

              <h3 className="text-xl font-bold app-title mt-3">
                {user.name}
              </h3>

              <p className="app-muted text-sm">
                Personal User
              </p>

            </div>


            <div className="space-y-4">

              <div>

                <label className="block text-sm font-semibold app-title mb-1">
                  Name
                </label>

                <div className="app-input rounded-lg px-4 py-3 app-title">
                  {user.name}
                </div>

              </div>


              <div>

                <label className="block text-sm font-semibold app-title mb-1">
                  Email
                </label>

                <div className="app-input rounded-lg px-4 py-3 app-title break-all">
                  {user.email ||
                    "Email not available"}
                </div>

              </div>


              <div>

                <label className="block text-sm font-semibold app-title mb-1">
                  Account Type
                </label>

                <div className="app-input rounded-lg px-4 py-3 app-title">
                  Personal User
                </div>

              </div>

            </div>


            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

              <button
                type="button"
                onClick={
                  handleCloseProfile
                }
                className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  handleCloseProfile();
                  navigate("/settings");
                }}
                className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition"
              >
                Account Settings
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
};

export default Navbar;