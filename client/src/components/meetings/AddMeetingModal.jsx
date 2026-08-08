import { useEffect, useState } from "react";

import {
  createMeeting,
  updateMeeting,
} from "../../services/meetingService";

const defaultMeeting = {
  title: "",
  date: "",
  startTime: "",
  endTime: "",
  type: "Work",
  location: "",
  meetingLink: "",
  participants: "",
  notes: "",
  status: "Scheduled",
};

const AddMeetingModal = ({
  isOpen,
  onClose,
  refreshMeetings,
  meetingToEdit,
}) => {
  const [meeting, setMeeting] = useState({
    ...defaultMeeting,
  });

  const [saving, setSaving] = useState(false);

  const isEditing = !!meetingToEdit?._id;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditing) {
      setMeeting({
        title: meetingToEdit.title || "",

        date: meetingToEdit.date
          ? meetingToEdit.date.slice(0, 10)
          : "",

        startTime: meetingToEdit.startTime || "",

        endTime: meetingToEdit.endTime || "",

        type: meetingToEdit.type || "Work",

        location: meetingToEdit.location || "",

        meetingLink: meetingToEdit.meetingLink || "",

        participants: Array.isArray(
          meetingToEdit.participants
        )
          ? meetingToEdit.participants.join(", ")
          : "",

        notes: meetingToEdit.notes || "",

        status: meetingToEdit.status || "Scheduled",
      });
    } else {
      setMeeting({
        ...defaultMeeting,
      });
    }
  }, [isOpen, meetingToEdit, isEditing]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setMeeting((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!meeting.title.trim()) {
      return alert("Please enter a meeting title.");
    }

    if (!meeting.date) {
      return alert("Please select a date.");
    }

    if (
      meeting.startTime &&
      meeting.endTime &&
      meeting.endTime <= meeting.startTime
    ) {
      return alert(
        "End time must be later than start time."
      );
    }

    try {
      setSaving(true);

      const payload = {
        ...meeting,

        participants: meeting.participants
          ? meeting.participants
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
      };

      if (isEditing) {
        await updateMeeting(
          meetingToEdit._id,
          payload
        );
      } else {
        await createMeeting(payload);
      }

      await refreshMeetings();

      setMeeting({
        ...defaultMeeting,
      });

      onClose();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Error saving meeting."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-[700px] max-w-[95%] max-h-[90vh] overflow-y-auto p-8">

        <h2 className="text-3xl font-bold mb-6">
          {isEditing
            ? "Edit Meeting"
            : "Add Meeting"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {/* Title */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Meeting Title
            </label>

            <input
              type="text"
              name="title"
              value={meeting.title}
              onChange={handleChange}
              placeholder="Team Meeting"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-semibold mb-2">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={meeting.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block font-semibold mb-2">
              Type
            </label>

            <select
              name="type"
              value={meeting.type}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Interview</option>
              <option>Client</option>
              <option>Team</option>
              <option>Other</option>
            </select>
          </div>

          {/* Start */}
          <div>
            <label className="block font-semibold mb-2">
              Start Time
            </label>

            <input
              type="time"
              name="startTime"
              value={meeting.startTime}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* End */}
          <div>
            <label className="block font-semibold mb-2">
              End Time
            </label>

            <input
              type="time"
              name="endTime"
              value={meeting.endTime}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={meeting.location}
              onChange={handleChange}
              placeholder="Office / Online"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block font-semibold mb-2">
              Meeting Link
            </label>

            <input
              type="url"
              name="meetingLink"
              value={meeting.meetingLink}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Participants */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Participants
            </label>

            <input
              type="text"
              name="participants"
              value={meeting.participants}
              onChange={handleChange}
              placeholder="John, Sarah, Alex"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <p className="text-xs text-gray-500 mt-1">
              Separate names with commas.
            </p>
          </div>

          {/* Status */}
          {isEditing && (
            <div>
              <label className="block font-semibold mb-2">
                Status
              </label>

              <select
                name="status"
                value={meeting.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
          )}

        </div>

        {/* Notes */}
        <div className="mt-4">
          <label className="block font-semibold mb-2">
            Notes
          </label>

          <textarea
            name="notes"
            value={meeting.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Meeting notes..."
            className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : isEditing
              ? "Update Meeting"
              : "Save Meeting"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddMeetingModal;