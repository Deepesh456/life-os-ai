import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import StatCard from "../../components/dashboard/StatCard";
import WeeklyProductivityChart from "../../components/dashboard/WeeklyProductivityChart";
import FinanceOverviewChart from "../../components/dashboard/FinanceOverviewChart";
import WeeklyActivityChart from "../../components/dashboard/WeeklyActivityChart";
import AIInsights from "../../components/dashboard/AIInsights";

import { getDashboardData } from "../../services/dashboardService";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaWallet,
  FaBullseye,
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // =========================
  // USER
  // =========================

  const [userName, setUserName] = useState("User");

  // =========================
  // STATS
  // =========================

  const [stats, setStats] = useState({
    todayEvents: 0,
    pendingTasks: 0,
    activeGoals: 0,
    balance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });

  const [todayEvents, setTodayEvents] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [activeGoals, setActiveGoals] = useState([]);
  const [recentTransactions, setRecentTransactions] =
    useState([]);

  const [chartData, setChartData] = useState({
    completedTasks: 0,
    pendingTasks: 0,
    income: 0,
    expense: 0,
    weeklyActivity: [],
  });

  // =========================
  // LOAD LOGGED-IN USER
  // =========================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        setUserName(
          parsedUser.name ||
            parsedUser.username ||
            "User"
        );
      }
    } catch (error) {
      console.error(
        "Unable to load user:",
        error
      );

      setUserName("User");
    }
  }, []);

  // =========================
  // LOAD DASHBOARD
  // =========================

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();

      setStats(res.data.stats || {});

      setTodayEvents(
        res.data.todayEvents || []
      );

      setPendingTasks(
        res.data.pendingTasks || []
      );

      setActiveGoals(
        res.data.activeGoals || []
      );

      setRecentTransactions(
        res.data.recentTransactions || []
      );

      setChartData(
        res.data.chartData || {
          completedTasks: 0,
          pendingTasks: 0,
          income: 0,
          expense: 0,
          weeklyActivity: [],
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GREETING
  // =========================

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  // =========================
  // RETURN
  // =========================

  return (
    <Layout>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold app-title">
          {greeting}, {userName} 👋
        </h1>

        <p className="app-text mt-2">
          Welcome to your Life OS AI Dashboard
        </p>

      </div>

      {loading ? (
        <div className="text-center py-20 text-xl font-semibold app-title">
          Loading Dashboard...
        </div>
      ) : (
        <>

          {/* Stats */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatCard
              title="Today's Events"
              value={stats.todayEvents}
              icon={FaCalendarAlt}
              color="bg-blue-500"
            />

            <StatCard
              title="Pending Tasks"
              value={stats.pendingTasks}
              icon={FaCheckCircle}
              color="bg-orange-500"
            />

            <StatCard
              title="Current Balance"
              value={`₹${Number(
                stats.balance || 0
              ).toLocaleString("en-IN")}`}
              icon={FaWallet}
              color="bg-green-600"
            />

            <StatCard
              title="Active Goals"
              value={stats.activeGoals}
              icon={FaBullseye}
              color="bg-purple-600"
            />

          </div>

          {/* Dashboard Charts */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            <WeeklyProductivityChart
              completed={
                chartData.completedTasks
              }
              pending={
                chartData.pendingTasks
              }
            />

            <FinanceOverviewChart
              income={chartData.income}
              expense={chartData.expense}
            />

          </div>

          <div className="mt-6">

            <WeeklyActivityChart
              weeklyActivity={
                chartData.weeklyActivity
              }
            />

          </div>

          {/* Quick Actions */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">

            <button
              onClick={() =>
                navigate("/tasks")
              }
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-5 font-semibold transition"
            >
              ✅ Tasks
            </button>

            <button
              onClick={() =>
                navigate("/calendar")
              }
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 font-semibold transition"
            >
              📅 Calendar
            </button>

            <button
              onClick={() =>
                navigate("/finance")
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl p-5 font-semibold transition"
            >
              💰 Finance
            </button>

            <button
              onClick={() =>
                navigate("/goals")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-5 font-semibold transition"
            >
              🎯 Goals
            </button>

          </div>

          {/* Today's Events & Pending Tasks */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            {/* Today's Events */}

            <div className="app-card rounded-2xl shadow p-6">

              <h2 className="app-title text-xl font-bold mb-4">
                📅 Today's Events
              </h2>

              {todayEvents.length === 0 ? (
                <p className="app-muted">
                  No events today
                </p>
              ) : (
                todayEvents.map((event) => (
                  <div
                    key={event._id}
                    className="border-b app-border py-3"
                  >

                    <h3 className="app-title font-semibold">
                      {event.title}
                    </h3>

                    <p className="text-sm app-muted">
                      {event.startTime || "--"} -{" "}
                      {event.endTime || "--"}
                    </p>

                  </div>
                ))
              )}

            </div>

            {/* Pending Tasks */}

            <div className="app-card rounded-2xl shadow p-6">

              <h2 className="app-title text-xl font-bold mb-4">
                ✅ Pending Tasks
              </h2>

              {pendingTasks.length === 0 ? (
                <p className="app-muted">
                  No pending tasks
                </p>
              ) : (
                pendingTasks.map((task) => (
                  <div
                    key={task._id}
                    className="border-b app-border py-3"
                  >

                    <h3 className="app-title font-semibold">
                      {task.title}
                    </h3>

                    <p className="app-muted text-sm">
                      {task.priority}
                    </p>

                  </div>
                ))
              )}

            </div>

          </div>

          {/* Transactions & Goals */}

          <div className="grid lg:grid-cols-2 gap-6 mt-6">

            {/* Recent Transactions */}

            <div className="app-card rounded-2xl shadow p-6">

              <h2 className="app-title text-xl font-bold mb-4">
                💰 Recent Transactions
              </h2>

              {recentTransactions.length === 0 ? (
                <p className="app-muted">
                  No transactions
                </p>
              ) : (
                recentTransactions.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border-b app-border py-3"
                  >

                    <div>

                      <div className="app-title font-semibold">
                        {item.title}
                      </div>

                      <small className="app-muted">
                        {item.category}
                      </small>

                    </div>

                    <div
                      className={`font-bold ${
                        item.type === "Income"
                          ? "app-success"
                          : "app-danger"
                      }`}
                    >
                      {item.type === "Income"
                        ? "+"
                        : "-"}
                      ₹
                      {Number(
                        item.amount || 0
                      ).toLocaleString("en-IN")}
                    </div>

                  </div>
                ))
              )}

            </div>

            {/* Active Goals */}

            <div className="app-card rounded-2xl shadow p-6">

              <h2 className="app-title text-xl font-bold mb-4">
                🎯 Active Goals
              </h2>

              {activeGoals.length === 0 ? (
                <p className="app-muted">
                  No active goals
                </p>
              ) : (
                activeGoals.map((goal) => (
                  <div
                    key={goal._id}
                    className="border-b app-border py-3"
                  >

                    <div className="app-title font-semibold">
                      {goal.title}
                    </div>

                    <div className="app-muted text-sm">
                      {goal.progress || 0}% Completed
                    </div>

                  </div>
                ))
              )}

            </div>

          </div>

          {/* AI Summary */}

          <div className="mt-8">

            <AIInsights
              stats={stats}
              pendingTasks={pendingTasks}
              todayEvents={todayEvents}
              recentTransactions={
                recentTransactions
              }
            />

          </div>

        </>
      )}

    </Layout>
  );
};

export default Dashboard;