import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";

import {
  getTasks,
  deleteTask,
  updateTask,
} from "../../services/taskService";

import AddTaskModal from "../../components/tasks/AddTaskModal";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] =
    useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();

      setTasks(
        res.data.tasks || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);

      await fetchTasks();
    } catch (err) {
      console.error(err);

      alert(
        "Failed to delete task"
      );
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleComplete = async (task) => {
    try {
      await updateTask(task._id, {
        completed: !task.completed,
      });

      await fetchTasks();
    } catch (err) {
      console.error(err);

      alert(
        "Failed to update task"
      );
    }
  };

  const totalTasks = tasks.length;

  const pendingTasks =
    tasks.filter(
      (task) => !task.completed
    ).length;

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const highPriorityTasks =
    tasks.filter(
      (task) =>
        task.priority === "High"
    ).length;

  return (
    <Layout>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold app-title">
            My Tasks 📋
          </h1>

          <p className="app-muted mt-2">
            Organize your work and stay productive.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedTask(null);
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
          + Add Task
        </button>

      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Total */}

        <div className="app-card rounded-xl shadow-md p-5">

          <p className="app-muted text-sm">
            Total Tasks
          </p>

          <h2 className="text-3xl font-bold mt-2 app-title">
            {totalTasks}
          </h2>

        </div>


        {/* Pending */}

        <div className="app-card rounded-xl shadow-md p-5">

          <p className="app-muted text-sm">
            Pending
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {pendingTasks}
          </h2>

        </div>


        {/* Completed */}

        <div className="app-card rounded-xl shadow-md p-5">

          <p className="app-muted text-sm">
            Completed
          </p>

          <h2 className="text-3xl font-bold text-green-500 mt-2">
            {completedTasks}
          </h2>

        </div>


        {/* High Priority */}

        <div className="app-card rounded-xl shadow-md p-5">

          <p className="app-muted text-sm">
            High Priority
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {highPriorityTasks}
          </h2>

        </div>

      </div>


      {/* Empty State */}

      {tasks.length === 0 ? (

        <div className="app-card rounded-xl shadow-md p-10 text-center">

          <div className="text-5xl mb-4">
            📋
          </div>

          <h2 className="text-2xl font-bold app-title">
            No Tasks Yet
          </h2>

          <p className="app-muted mt-3">
            Create your first task to get started.
          </p>

          <button
            onClick={() => {
              setSelectedTask(null);
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
            + Create Your First Task
          </button>

        </div>

      ) : (

        /* Task List */

        <div className="space-y-5">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="
                app-card
                rounded-xl
                shadow-md
                p-6
                transition
                hover:shadow-lg
              "
            >

              {/* Task Header */}

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">

                <div className="min-w-0">

                  {/* Title */}

                  <h2
                    className={`text-2xl font-semibold break-words ${
                      task.completed
                        ? "line-through text-gray-400 dark:text-gray-500"
                        : "app-title"
                    }`}
                  >
                    {task.title}
                  </h2>


                  {/* Description */}

                  {task.description && (
                    <p
                      className={`mt-2 ${
                        task.completed
                          ? "line-through text-gray-400 dark:text-gray-500"
                          : "app-muted"
                      }`}
                    >
                      {task.description}
                    </p>
                  )}


                  {/* Metadata */}

                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">

                    <span className="app-muted">
                      <strong className="app-title">
                        Priority:
                      </strong>{" "}
                      {task.priority ||
                        "Normal"}
                    </span>

                    <span className="app-muted">
                      <strong className="app-title">
                        Due:
                      </strong>{" "}
                      {task.dueDate
                        ? new Date(
                            task.dueDate
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "No Date"}
                    </span>

                  </div>

                </div>


                {/* Status */}

                <span
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    px-4
                    py-2
                    rounded-full
                    text-white
                    font-medium
                    whitespace-nowrap
                    ${
                      task.completed
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }
                  `}
                >
                  {task.completed
                    ? "✅ Completed"
                    : "🟠 Pending"}
                </span>

              </div>


              {/* Actions */}

              <div className="flex flex-wrap gap-3 mt-6">

                <button
                  onClick={() =>
                    handleEdit(task)
                  }
                  className="
                    bg-blue-500
                    hover:bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                  "
                >
                  ✏ Edit
                </button>


                <button
                  onClick={() =>
                    handleComplete(task)
                  }
                  className={`
                    px-4
                    py-2
                    rounded-lg
                    text-white
                    transition
                    ${
                      task.completed
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    }
                  `}
                >
                  {task.completed
                    ? "↩ Undo"
                    : "✔ Complete"}
                </button>


                <button
                  onClick={() =>
                    handleDelete(
                      task._id
                    )
                  }
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                  "
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* Add / Edit Modal */}

      <AddTaskModal
        isOpen={open}

        onClose={() => {
          setOpen(false);
          setSelectedTask(null);
        }}

        refreshTasks={
          fetchTasks
        }

        taskToEdit={
          selectedTask
        }
      />

    </Layout>
  );
};

export default Tasks;