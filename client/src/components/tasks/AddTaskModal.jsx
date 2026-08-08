import { useEffect, useState } from "react";
import {
  createTask,
  updateTask,
} from "../../services/taskService";

const defaultTask = {
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
};

const AddTaskModal = ({
  isOpen,
  onClose,
  refreshTasks,
  taskToEdit,
}) => {
  const [task, setTask] =
    useState(defaultTask);

  const isEditing = !!taskToEdit?._id;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditing) {
      setTask({
        title:
          taskToEdit.title || "",

        description:
          taskToEdit.description || "",

        priority:
          taskToEdit.priority ||
          "Medium",

        dueDate:
          taskToEdit.dueDate
            ? taskToEdit.dueDate.split(
                "T"
              )[0]
            : "",
      });
    } else {
      setTask({
        ...defaultTask,
      });
    }
  }, [isOpen, taskToEdit, isEditing]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!task.title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    try {
      if (isEditing) {
        await updateTask(
          taskToEdit._id,
          task
        );
      } else {
        await createTask(task);
      }

      await refreshTasks();

      setTask({
        ...defaultTask,
      });

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          (isEditing
            ? "Failed to update task"
            : "Failed to create task")
      );
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          app-card
          w-full
          max-w-[620px]
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          shadow-2xl
          p-8
        "
      >

        {/* Header */}

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold app-title">
            {isEditing
              ? "Edit Task"
              : "Add New Task"}
          </h2>

          <button
            onClick={onClose}
            className="
              text-2xl
              app-muted
              hover:text-red-500
              transition
            "
            aria-label="Close"
          >
            ×
          </button>

        </div>


        {/* Task Title */}

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          className="
            app-input
            w-full
            border
            p-3
            rounded-lg
            mb-4
            outline-none
          "
        />


        {/* Description */}

        <textarea
          name="description"
          rows="4"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          className="
            app-input
            w-full
            border
            p-3
            rounded-lg
            mb-4
            resize-none
            outline-none
          "
        />


        {/* Priority */}

        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="
            app-input
            w-full
            border
            p-3
            rounded-lg
            mb-4
            outline-none
          "
        >
          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>
        </select>


        {/* Due Date */}

        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="
            app-input
            w-full
            border
            p-3
            rounded-lg
            mb-6
            outline-none
          "
        />


        {/* Buttons */}

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="
              px-5
              py-2
              rounded-lg
              bg-gray-200
              hover:bg-gray-300
              dark:bg-gray-700
              dark:hover:bg-gray-600
              app-title
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              px-5
              py-2
              rounded-lg
              bg-purple-600
              text-white
              hover:bg-purple-700
              transition
            "
          >
            {isEditing
              ? "Update Task"
              : "Save Task"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddTaskModal;