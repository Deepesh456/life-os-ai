import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";

import {
  getGoals,
  deleteGoal,
} from "../../services/goalService";

import AddGoalModal from "../../components/goals/AddGoalModal";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] =
    useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await getGoals();

      setGoals(
        res.data.goals || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this goal?"
      );

    if (!confirmDelete) return;

    try {
      await deleteGoal(id);

      await fetchGoals();
    } catch (err) {
      console.error(err);

      alert(
        "Failed to delete goal"
      );
    }
  };

  const handleEdit = (goal) => {
    setSelectedGoal(goal);
    setOpen(true);
  };

  return (
    <Layout>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>

          <h1 className="text-4xl md:text-5xl font-bold app-title">
            Goals 🎯
          </h1>

          <p className="app-muted mt-2 text-lg">
            You have{" "}
            <strong className="app-title">
              {goals.length}
            </strong>{" "}
            {goals.length === 1
              ? "goal"
              : "goals"}
            .
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedGoal(null);
            setOpen(true);
          }}
          className="
            bg-purple-600
            hover:bg-purple-700
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
            shadow-md
          "
        >
          + Add Goal
        </button>

      </div>


      {/* Empty State */}

      {goals.length === 0 ? (

        <div className="app-card rounded-2xl shadow-md p-12 text-center">

          <div className="text-5xl mb-4">
            🎯
          </div>

          <h2 className="text-3xl font-bold app-title">
            No Goals Yet
          </h2>

          <p className="app-muted mt-3">
            Start by creating your first goal.
          </p>

          <button
            onClick={() => {
              setSelectedGoal(null);
              setOpen(true);
            }}
            className="
              mt-6
              bg-purple-600
              hover:bg-purple-700
              text-white
              px-6
              py-3
              rounded-xl
              transition
            "
          >
            + Create Your First Goal
          </button>

        </div>

      ) : (

        /* Goals */

        <div className="space-y-6">

          {goals.map((goal) => {

            const progress = Math.min(
              100,
              Math.max(
                0,
                Number(goal.progress) || 0
              )
            );

            const isCompleted =
              progress === 100;

            return (
              <div
                key={goal._id}
                className="
                  app-card
                  rounded-2xl
                  shadow-md
                  p-6
                  hover:shadow-lg
                  transition
                "
              >

                {/* Goal Header */}

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">

                  <div className="flex-1 min-w-0">

                    <h2 className="text-2xl font-bold app-title break-words">
                      {goal.title}
                    </h2>

                    {goal.description && (
                      <p className="app-muted mt-2">
                        {goal.description}
                      </p>
                    )}

                  </div>


                  {/* Status */}

                  {isCompleted ? (

                    <span
                      className="
                        bg-green-100
                        dark:bg-green-900/30
                        text-green-700
                        dark:text-green-400
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        whitespace-nowrap
                      "
                    >
                      ✅ Completed
                    </span>

                  ) : (

                    <span
                      className="
                        bg-yellow-100
                        dark:bg-yellow-900/30
                        text-yellow-700
                        dark:text-yellow-400
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        whitespace-nowrap
                      "
                    >
                      🚀 In Progress
                    </span>

                  )}

                </div>


                {/* Progress */}

                <div className="mt-6">

                  <div className="flex justify-between mb-2">

                    <span className="font-medium app-title">
                      Progress
                    </span>

                    <span className="font-bold app-title">
                      {progress}%
                    </span>

                  </div>

                  <div
                    className="
                      w-full
                      h-4
                      bg-gray-200
                      dark:bg-gray-700
                      rounded-full
                      overflow-hidden
                    "
                  >

                    <div
                      className={`
                        h-full
                        rounded-full
                        transition-all
                        duration-500
                        ${
                          isCompleted
                            ? "bg-green-500"
                            : progress >= 70
                            ? "bg-blue-500"
                            : progress >= 40
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }
                      `}
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>


                {/* Actions */}

                <div className="flex flex-wrap gap-3 mt-6">

                  <button
                    onClick={() =>
                      handleEdit(goal)
                    }
                    className="
                      bg-blue-500
                      hover:bg-blue-600
                      text-white
                      px-5
                      py-2
                      rounded-lg
                      transition
                    "
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        goal._id
                      )
                    }
                    className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-5
                      py-2
                      rounded-lg
                      transition
                    "
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      )}


      {/* Add / Edit Goal Modal */}

      <AddGoalModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelectedGoal(null);
        }}
        refreshGoals={fetchGoals}
        goalToEdit={selectedGoal}
      />

    </Layout>
  );
};

export default Goals;