import { useEffect, useState } from "react";

import {
  createHealthRecord,
  updateHealthRecord,
} from "../../services/healthService";

const defaultHealth = {
  date: "",
  weight: "",
  waterIntake: "",
  sleepHours: "",
  exerciseMinutes: "",
  exerciseType: "",
  calories: "",
  notes: "",
};

const AddHealthModal = ({
  isOpen,
  onClose,
  refreshHealth,
  healthToEdit,
}) => {
  const [health, setHealth] = useState(defaultHealth);

  const isEditing = !!healthToEdit?._id;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditing) {
      setHealth({
        date: healthToEdit.date
          ? healthToEdit.date.slice(0, 10)
          : "",

        weight: healthToEdit.weight ?? "",

        waterIntake:
          healthToEdit.waterIntake ?? "",

        sleepHours:
          healthToEdit.sleepHours ?? "",

        exerciseMinutes:
          healthToEdit.exerciseMinutes ?? "",

        exerciseType:
          healthToEdit.exerciseType || "",

        calories:
          healthToEdit.calories ?? "",

        notes:
          healthToEdit.notes || "",
      });
    } else {
      setHealth({
        ...defaultHealth,
        date: new Date()
          .toISOString()
          .slice(0, 10),
      });
    }
  }, [isOpen, healthToEdit, isEditing]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setHealth((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!health.date) {
      return alert("Please select a date.");
    }

    try {
      const payload = {
        ...health,

        weight:
          health.weight === ""
            ? null
            : Number(health.weight),

        waterIntake:
          health.waterIntake === ""
            ? 0
            : Number(health.waterIntake),

        sleepHours:
          health.sleepHours === ""
            ? 0
            : Number(health.sleepHours),

        exerciseMinutes:
          health.exerciseMinutes === ""
            ? 0
            : Number(health.exerciseMinutes),

        calories:
          health.calories === ""
            ? 0
            : Number(health.calories),
      };

      if (isEditing) {
        await updateHealthRecord(
          healthToEdit._id,
          payload
        );
      } else {
        await createHealthRecord(payload);
      }

      await refreshHealth();

      setHealth(defaultHealth);

      onClose();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Error saving health record."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      <div className="app-card rounded-2xl shadow-2xl w-[650px] max-w-[95%] p-8 max-h-[90vh] overflow-y-auto">

        <h2 className="text-3xl font-bold mb-6 app-title">
          {isEditing
            ? "Edit Health Record"
            : "Add Health Record"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {/* Date */}

          <div>
            <label className="block font-semibold mb-2 app-muted">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={health.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Weight */}

          <div>
            <label className="block font-semibold mb-2 app-muted">
              Weight (kg)
            </label>

            <input
              type="number"
              name="weight"
              value={health.weight}
              onChange={handleChange}
              placeholder="70"
              min="0"
              step="0.1"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Water */}

          <div>
            <label className="block font-semibold mb-2 app-muted">
              Water Intake (L)
            </label>

            <input
              type="number"
              name="waterIntake"
              value={health.waterIntake}
              onChange={handleChange}
              placeholder="2.5"
              min="0"
              step="0.1"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Sleep */}

          <div>
            <label className="block font-semibold mb-2 app-muted">
              Sleep (Hours)
            </label>

            <input
              type="number"
              name="sleepHours"
              value={health.sleepHours}
              onChange={handleChange}
              placeholder="8"
              min="0"
              max="24"
              step="0.5"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Exercise */}

          <div>
            <label className="block font-semibold mb-2 app-muted">
              Exercise (Minutes)
            </label>

            <input
              type="number"
              name="exerciseMinutes"
              value={health.exerciseMinutes}
              onChange={handleChange}
              placeholder="30"
              min="0"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Exercise Type */}

          <div>
            <label className="block font-semibold mb-2 app-muted">
              Exercise Type
            </label>

            <input
              type="text"
              name="exerciseType"
              value={health.exerciseType}
              onChange={handleChange}
              placeholder="Running, Gym, Walking..."
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Calories */}

          <div>
            <label className="block font-semibold mb-2 app-muted">
              Calories
            </label>

            <input
              type="number"
              name="calories"
              value={health.calories}
              onChange={handleChange}
              placeholder="2000"
              min="0"
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        {/* Notes */}

        <div className="mt-4">

          <label className="block font-semibold mb-2 app-muted">
            Notes
          </label>

          <textarea
            name="notes"
            value={health.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Any notes about today's health..."
            className="w-full border rounded-lg p-3"
          />

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-slate-700 text-gray-200 hover:bg-slate-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            {isEditing
              ? "Update Record"
              : "Save Record"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddHealthModal;