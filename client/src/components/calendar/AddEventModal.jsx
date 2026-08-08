import { useEffect, useState } from "react";

import {
  createEvent,
  updateEvent,
} from "../../services/eventService";

const defaultEvent = {
  title: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  category: "Personal",
  color: "#7C3AED",
};

const AddEventModal = ({
  isOpen,
  onClose,
  refreshEvents,
  eventToEdit,
  onDelete,
}) => {
  const [event, setEvent] =
    useState(defaultEvent);

  const isEditing =
    !!eventToEdit?._id;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditing) {
      setEvent({
        title:
          eventToEdit.title || "",

        description:
          eventToEdit.description || "",

        date:
          eventToEdit.date?.slice(
            0,
            10
          ) || "",

        startTime:
          eventToEdit.startTime || "",

        endTime:
          eventToEdit.endTime || "",

        category:
          eventToEdit.category ||
          "Personal",

        color:
          eventToEdit.color ||
          "#7C3AED",
      });
    } else if (eventToEdit?.date) {
      setEvent({
        ...defaultEvent,
        date: eventToEdit.date,
      });
    } else {
      setEvent({
        ...defaultEvent,
      });
    }
  }, [
    eventToEdit,
    isOpen,
    isEditing,
  ]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!event.title.trim()) {
      alert(
        "Please enter an event title."
      );
      return;
    }

    if (!event.date) {
      alert(
        "Please select a date."
      );
      return;
    }

    if (
      event.startTime &&
      event.endTime &&
      event.endTime <
        event.startTime
    ) {
      alert(
        "End time cannot be earlier than start time."
      );
      return;
    }

    try {
      if (isEditing) {
        await updateEvent(
          eventToEdit._id,
          event
        );
      } else {
        await createEvent(event);
      }

      await refreshEvents();

      setEvent({
        ...defaultEvent,
      });

      onClose();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Error saving event."
      );
    }
  };

  const handleDelete = async () => {
    if (!eventToEdit?._id) {
      return;
    }

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this event?"
      );

    if (!confirmDelete) return;

    try {
      await onDelete(eventToEdit);

      setEvent({
        ...defaultEvent,
      });

      onClose();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Error deleting event."
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
          rounded-2xl
          w-full
          max-w-[620px]
          max-h-[90vh]
          overflow-y-auto
          p-8
          shadow-2xl
        "
      >

        {/* Header */}

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold app-title">
            {isEditing
              ? "Edit Event"
              : "Create Event"}
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


        {/* Title */}

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
          className="
            app-input
            w-full
            border
            rounded-lg
            p-3
            mb-4
            outline-none
          "
        />


        {/* Description */}

        <textarea
          rows="4"
          name="description"
          placeholder="Description"
          value={event.description}
          onChange={handleChange}
          className="
            app-input
            w-full
            border
            rounded-lg
            p-3
            mb-4
            resize-none
            outline-none
          "
        />


        {/* Date / Category / Time */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* Date */}

          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="
              app-input
              border
              rounded-lg
              p-3
              outline-none
            "
          />


          {/* Category */}

          <select
            name="category"
            value={event.category}
            onChange={handleChange}
            className="
              app-input
              border
              rounded-lg
              p-3
              outline-none
            "
          >
            <option value="Personal">
              Personal
            </option>

            <option value="Meeting">
              Meeting
            </option>

            <option value="Task">
              Task
            </option>

            <option value="Reminder">
              Reminder
            </option>
          </select>


          {/* Start Time */}

          <input
            type="time"
            name="startTime"
            value={event.startTime}
            onChange={handleChange}
            className="
              app-input
              border
              rounded-lg
              p-3
              outline-none
            "
          />


          {/* End Time */}

          <input
            type="time"
            name="endTime"
            value={event.endTime}
            onChange={handleChange}
            className="
              app-input
              border
              rounded-lg
              p-3
              outline-none
            "
          />

        </div>


        {/* Event Color */}

        <div className="mb-6">

          <label className="block font-semibold app-title mb-2">
            Event Color
          </label>

          <input
            type="color"
            name="color"
            value={event.color}
            onChange={handleChange}
            className="
              w-20
              h-10
              border
              rounded
              cursor-pointer
              bg-transparent
            "
          />

        </div>


        {/* Buttons */}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">

          {/* Delete */}

          <div>
            {isEditing && (
              <button
                onClick={handleDelete}
                className="
                  px-5
                  py-2
                  rounded-lg
                  bg-red-600
                  text-white
                  hover:bg-red-700
                  transition
                "
              >
                Delete
              </button>
            )}
          </div>


          {/* Cancel / Save */}

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="
                px-6
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
              onClick={handleSubmit}
              className="
                px-6
                py-2
                rounded-lg
                bg-purple-600
                text-white
                hover:bg-purple-700
                transition
              "
            >
              {isEditing
                ? "Update Event"
                : "Save Event"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddEventModal;