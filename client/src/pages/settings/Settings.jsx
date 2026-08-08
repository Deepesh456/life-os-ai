import { useEffect, useState } from "react";

import Layout from "../../components/layout/Layout";

import {
  getSettings,
  updateSettings,
} from "../../services/settingsService";

const defaultSettings = {
  theme: "System",
  language: "English",
  timezone: "Asia/Kolkata",

  notifications: {
    email: true,
    taskReminders: true,
    meetingReminders: true,
    goalReminders: true,
  },
};

const Settings = () => {
  const [settings, setSettings] =
    useState(defaultSettings);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  /*
    Apply selected theme
  */

  const applyTheme = (theme) => {
    const root = document.documentElement;

    if (theme === "Dark") {
      root.classList.add("dark");
      return;
    }

    if (theme === "Light") {
      root.classList.remove("dark");
      return;
    }

    // System theme

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    root.classList.toggle(
      "dark",
      prefersDark
    );
  };

  /*
    Fetch settings
  */

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const res = await getSettings();

      if (res.data.settings) {
        const loadedSettings = {
          ...defaultSettings,
          ...res.data.settings,

          notifications: {
            ...defaultSettings.notifications,
            ...(res.data.settings.notifications ||
              {}),
          },
        };

        setSettings(loadedSettings);

        applyTheme(
          loadedSettings.theme
        );
      } else {
        applyTheme(
          defaultSettings.theme
        );
      }
    } catch (err) {
      console.error(err);

      setMessage(
        err.response?.data?.message ||
          "Unable to load settings."
      );

      applyTheme(
        defaultSettings.theme
      );
    } finally {
      setLoading(false);
    }
  };

  /*
    Follow system theme changes
  */

  useEffect(() => {
    if (settings.theme !== "System") {
      return;
    }

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemThemeChange = (
      event
    ) => {
      document.documentElement.classList.toggle(
        "dark",
        event.matches
      );
    };

    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange
      );
    };
  }, [settings.theme]);

  /*
    Handle normal settings
  */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "theme") {
      applyTheme(value);
    }

    setMessage("");
  };

  /*
    Handle notification settings
  */

  const handleNotificationChange = (e) => {
    const {
      name,
      checked,
    } = e.target;

    setSettings((prev) => ({
      ...prev,

      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }));

    setMessage("");
  };

  /*
    Save settings
  */

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      await updateSettings({
        theme: settings.theme,
        language: settings.language,
        timezone: settings.timezone,

        notifications:
          settings.notifications,
      });

      // Make sure the selected theme
      // remains applied after saving.

      applyTheme(settings.theme);

      setMessage(
        "Settings saved successfully."
      );
    } catch (err) {
      console.error(err);

      setMessage(
        err.response?.data?.message ||
          "Unable to save settings."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
    Loading state
  */

  if (loading) {
    return (
      <Layout>

        <div className="flex items-center justify-center min-h-[400px]">

          <div className="text-center">

            <div className="text-4xl mb-4">
              ⚙️
            </div>

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Loading Settings...
            </p>

          </div>

        </div>

      </Layout>
    );
  }

  return (
    <Layout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Settings ⚙️
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Customize your Life OS experience.
        </p>

      </div>

      <div className="space-y-6">

        {/* Appearance */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-black/20 p-6 transition-colors">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              🎨 Appearance
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Choose how Life OS looks.
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Theme */}

            <div>

              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Theme
              </label>

              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
              >

                <option value="Light">
                  Light
                </option>

                <option value="Dark">
                  Dark
                </option>

                <option value="System">
                  System
                </option>

              </select>

            </div>

            {/* Language */}

            <div>

              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Language
              </label>

              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
              >

                <option value="English">
                  English
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* Regional Settings */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-black/20 p-6 transition-colors">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              🌍 Regional Settings
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Configure your timezone.
            </p>

          </div>

          <div>

            <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Timezone
            </label>

            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            >

              <option value="Asia/Kolkata">
                India — Asia/Kolkata
              </option>

              <option value="UTC">
                UTC
              </option>

              <option value="America/New_York">
                Eastern Time — America/New_York
              </option>

              <option value="America/Los_Angeles">
                Pacific Time — America/Los_Angeles
              </option>

              <option value="Europe/London">
                London — Europe/London
              </option>

              <option value="Asia/Dubai">
                Dubai — Asia/Dubai
              </option>

              <option value="Asia/Singapore">
                Singapore — Asia/Singapore
              </option>

            </select>

          </div>

        </div>

        {/* Notifications */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-black/20 p-6 transition-colors">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              🔔 Notifications
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Choose which notifications you want
              to receive.
            </p>

          </div>

          <div className="space-y-5">

            {/* Email */}

            <label className="flex items-center justify-between gap-4 cursor-pointer">

              <div>

                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Email Notifications
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive important updates through
                  email.
                </p>

              </div>

              <input
                type="checkbox"
                name="email"
                checked={
                  settings.notifications
                    .email
                }
                onChange={
                  handleNotificationChange
                }
                className="w-5 h-5 accent-indigo-600"
              />

            </label>

            {/* Task Reminders */}

            <label className="flex items-center justify-between gap-4 cursor-pointer">

              <div>

                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Task Reminders
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get reminders for pending tasks.
                </p>

              </div>

              <input
                type="checkbox"
                name="taskReminders"
                checked={
                  settings.notifications
                    .taskReminders
                }
                onChange={
                  handleNotificationChange
                }
                className="w-5 h-5 accent-indigo-600"
              />

            </label>

            {/* Meeting Reminders */}

            <label className="flex items-center justify-between gap-4 cursor-pointer">

              <div>

                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Meeting Reminders
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get reminders before meetings.
                </p>

              </div>

              <input
                type="checkbox"
                name="meetingReminders"
                checked={
                  settings.notifications
                    .meetingReminders
                }
                onChange={
                  handleNotificationChange
                }
                className="w-5 h-5 accent-indigo-600"
              />

            </label>

            {/* Goal Reminders */}

            <label className="flex items-center justify-between gap-4 cursor-pointer">

              <div>

                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Goal Reminders
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Stay updated on your active goals.
                </p>

              </div>

              <input
                type="checkbox"
                name="goalReminders"
                checked={
                  settings.notifications
                    .goalReminders
                }
                onChange={
                  handleNotificationChange
                }
                className="w-5 h-5 accent-indigo-600"
              />

            </label>

          </div>

        </div>

        {/* Save Settings */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-black/20 p-6 transition-colors">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="min-h-[24px]">

              {message && (
                <p
                  className={`font-semibold ${
                    message.includes(
                      "successfully"
                    )
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}

            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-8 py-3 rounded-xl text-white font-semibold transition ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {saving
                ? "Saving..."
                : "💾 Save Settings"}
            </button>

          </div>

        </div>

      </div>

    </Layout>
  );
};

export default Settings;