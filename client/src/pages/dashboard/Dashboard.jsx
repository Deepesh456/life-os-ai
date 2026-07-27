import Layout from "../../components/layout/Layout";
import StatCard from "../../components/dashboard/StatCard";
import TaskCard from "../../components/dashboard/TaskCard";
import MeetingCard from "../../components/dashboard/MeetingCard";

import {
  FaCheckCircle,
  FaBullseye,
  FaWallet,
  FaTint,
} from "react-icons/fa";

const Dashboard = () => {
    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
            ? "Good Afternoon"
            : "Good Evening";
  return (
    <Layout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          {greeting} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's your productivity overview for today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Today's Tasks"
          value="12"
          icon={FaCheckCircle}
          color="bg-green-500"
        />

        <StatCard
          title="Goals"
          value="5"
          icon={FaBullseye}
          color="bg-purple-500"
        />

        <StatCard
          title="Balance"
          value="₹12,500"
          icon={FaWallet}
          color="bg-yellow-500"
        />

        <StatCard
          title="Water Intake"
          value="5 / 8"
          icon={FaTint}
          color="bg-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <TaskCard />
        <MeetingCard />
        </div>
    </Layout>
  );
};

export default Dashboard;