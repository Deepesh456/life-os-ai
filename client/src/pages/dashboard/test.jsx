import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import StatCard from "../../components/dashboard/StatCard";
import TaskCard from "../../components/dashboard/TaskCard";
import MeetingCard from "../../components/dashboard/MeetingCard";

import api from "../../services/api";

import {
  FaCheckCircle,
  FaBullseye,
  FaWallet,
  FaTint,
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  const completion =
    totalTasks === 0
      ? "0%"
      : `${Math.round(
          (completedTasks / totalTasks) * 100
        )}%`;

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <Layout>
      {/* Greeting */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          {greeting}, Deepesh 👋
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Let's make today productive 🚀
        </p>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="text-center py-20 text-lg font-semibold">
          Loading Dashboard...
        </div>
      ) : (
        <>
          {/* Statistics */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Tasks"
              value={totalTasks}
              icon={FaCheckCircle}
              color="bg-green-500"
            />

            <StatCard
              title="Pending Tasks"
              value={pendingTasks}
              icon={FaBullseye}
              color="bg-orange-500"
            />

            <StatCard
              title="Completed"
              value={completedTasks}
              icon={FaWallet}
              color="bg-purple-500"
            />

            <StatCard
              title="Completion"
              value={completion}
              icon={FaTint}
              color="bg-blue-500"
            />

          </div>

          {/* Productivity */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-xl font-bold">
                Productivity Progress
              </h2>

              <span className="font-bold text-green-600">
                {completion}
              </span>

            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-green-500 transition-all duration-700"
                style={{
                  width: completion,
                }}
              />

            </div>

          </div>

          {/* Quick Actions */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

            <button
              onClick={() => navigate("/tasks")}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-5 font-semibold transition"
            >
              ➕ Add Task
            </button>

            <button
              onClick={() => navigate("/calendar")}
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 font-semibold transition"
            >
              📅 Calendar
            </button>

            <button
              onClick={() => navigate("/notes")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-5 font-semibold transition"
            >
              📝 Notes
            </button>

            <button
              onClick={() => navigate("/finance")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl p-5 font-semibold transition"
            >
              💰 Finance
            </button>

          </div>

          {/* Tasks & Meetings */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            <TaskCard tasks={tasks} />

            <MeetingCard />

          </div>

          {/* Recent Activity */}

          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

            <h2 className="text-xl font-bold mb-5">
              Recent Activity
            </h2>

            <ul className="space-y-4">

              <li className="border-b pb-3">
                ✅ Dashboard Opened
              </li>

              <li className="border-b pb-3">
                📋 Total Tasks: {totalTasks}
              </li>

              <li className="border-b pb-3">
                ✔ Completed Tasks: {completedTasks}
              </li>

              <li>
                ⏳ Pending Tasks: {pendingTasks}
              </li>

            </ul>

          </div>
        </>
      )}
    </Layout>
  );
};

export default Dashboard;