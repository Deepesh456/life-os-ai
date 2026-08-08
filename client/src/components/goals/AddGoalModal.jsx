import { useEffect, useState } from "react";
import {
  createGoal,
  updateGoal,
} from "../../services/goalService";

const defaultGoal = {
  title: "",
  description: "",
  progress: 0,
};

const AddGoalModal = ({
  isOpen,
  onClose,
  refreshGoals,
  goalToEdit,
}) => {
  const [goal, setGoal] =
    useState(defaultGoal);

  const isEditing = !!goalToEdit?._id;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditing) {
      setGoal({
        title:
          goalToEdit.title || "",

        description:
          goalToEdit.description || "",

        progress:
          Number(goalToEdit.progress) || 0,
      });
    } else {
      setGoal({
        ...defaultGoal,
      });
    }
  }, [isOpen, goalToEdit, isEditing]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setGoal((prev) => ({
      ...prev,
      [name]:
        name === "progress"
          ? Number(value)
          : value,
    }));
  };

  const handleSave = async () => {
    if (!goal.title.trim()) {
      alert("Please enter a goal title.");
      return;
    }

    try {
      if (isEditing) {
        await updateGoal(
          goalToEdit._id,
          goal
        );
      } else {
        await createGoal(goal);
      }

      await refreshGoals();

      setGoal({
        ...defaultGoal,
      });

      onClose();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to save goal"
      );
    }
  };

  const progress = Math.min(
    100,
    Math.max(
      0,
      Number(goal.progress) || 0
    )
  );

  const progressColor =
    progress === 100
      ? "bg-green-500"
      : progress >= 70
      ? "bg-blue-500"
      : progress >= 40
      ? "bg-yellow-500"
      : "bg-red-500";

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
              ? "Edit Goal"
              : "Add New Goal"}
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


        {/* Goal Title */}

        <input
          type="text"
          name="title"
          placeholder="Goal Title"
          value={goal.title}
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
          placeholder="Description"
          value={goal.description}
          onChange={handleChange}
          rows="4"
          className="
            app-input
            w-full
            border
            p-3
            rounded-lg
            mb-6
            resize-none
            outline-none
          "
        />


        {/* Progress */}

        <div className="flex justify-between items-center mb-2">

          <label className="font-semibold app-title">
            Progress
          </label>

          <span className="font-bold text-purple-600">
            {progress}%
          </span>

        </div>


        {/* Range */}

        <input
          type="range"
          min="0"
          max="100"
          step="10"
          name="progress"
          value={progress}
          onChange={handleChange}
          className="w-full mb-4 accent-purple-600"
        />


        {/* Progress Bar */}

        <div
          className="
            w-full
            h-3
            bg-gray-200
            dark:bg-gray-700
            rounded-full
            overflow-hidden
            mb-6
          "
        >
          <div
            className={`
              h-full
              ${progressColor}
              transition-all
              duration-500
            `}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>


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
              ? "Update Goal"
              : "Save Goal"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddGoalModal;