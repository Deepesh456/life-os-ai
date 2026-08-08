import { useEffect, useMemo, useState } from "react";

import Layout from "../../components/layout/Layout";
import AddMeetingModal from "../../components/meetings/AddMeetingModal";

import {
  getMeetings,
  deleteMeeting,
  updateMeeting,
} from "../../services/meetingService";

/*
  Check whether a meeting is genuinely upcoming.

  - Only Scheduled meetings are upcoming.
  - If a start time exists, compare the exact date + time.
  - If no start time exists, consider it upcoming until the
    end of that day.
*/
const isMeetingUpcoming = (meeting) => {
  if (meeting.status !== "Scheduled") {
    return false;
  }

  const meetingDate = new Date(meeting.date);

  if (Number.isNaN(meetingDate.getTime())) {
    return false;
  }

  if (!meeting.startTime) {
    const now = new Date();

    meetingDate.setHours(23, 59, 59, 999);

    return meetingDate >= now;
  }

  const [hours, minutes] = meeting.startTime
    .split(":")
    .map(Number);

  meetingDate.setHours(
    hours || 0,
    minutes || 0,
    0,
    0
  );

  return meetingDate >= new Date();
};

/*
  Get a meeting's actual date/time for sorting.
*/
const getMeetingDateTime = (meeting) => {
  const date = new Date(meeting.date);

  if (Number.isNaN(date.getTime())) {
    return 0;
  }

  if (meeting.startTime) {
    const [hours, minutes] = meeting.startTime
      .split(":")
      .map(Number);

    date.setHours(
      hours || 0,
      minutes || 0,
      0,
      0
    );
  } else {
    date.setHours(23, 59, 59, 999);
  }

  return date.getTime();
};

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [open, setOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] =
    useState(null);

  /*
    Fetch meetings
  */
  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      setLoading(true);

      const res = await getMeetings();

      setMeetings(res.data.meetings || []);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to load meetings."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
    Delete meeting
  */
  const handleDelete = async (meeting) => {
    const confirmDelete = window.confirm(
      "Delete this meeting?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteMeeting(meeting._id);

      await fetchMeetings();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Error deleting meeting."
      );
    }
  };

  /*
    Mark meeting as completed
  */
  const handleMarkCompleted = async (meeting) => {
    try {
      await updateMeeting(meeting._id, {
        status: "Completed",
      });

      await fetchMeetings();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to update meeting."
      );
    }
  };

  /*
    Filter meetings
  */
  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchText ||
        meeting.title
          ?.toLowerCase()
          .includes(searchText) ||
        meeting.type
          ?.toLowerCase()
          .includes(searchText) ||
        meeting.location
          ?.toLowerCase()
          .includes(searchText) ||
        meeting.notes
          ?.toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filter === "All" ||
        meeting.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [meetings, search, filter]);

  /*
    Statistics
  */
  const scheduledCount = meetings.filter(
    (meeting) =>
      meeting.status === "Scheduled"
  ).length;

  const completedCount = meetings.filter(
    (meeting) =>
      meeting.status === "Completed"
  ).length;

  const cancelledCount = meetings.filter(
    (meeting) =>
      meeting.status === "Cancelled"
  ).length;

  /*
    Upcoming meetings
  */
  const upcomingMeetings = useMemo(() => {
    return meetings
      .filter(isMeetingUpcoming)
      .sort(
        (a, b) =>
          getMeetingDateTime(a) -
          getMeetingDateTime(b)
      );
  }, [meetings]);

  /*
    Open create modal
  */
  const handleAddMeeting = () => {
    setSelectedMeeting(null);
    setOpen(true);
  };

  /*
    Open edit modal
  */
  const handleEditMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setOpen(true);
  };

  /*
    Close modal
  */
  const handleCloseModal = () => {
    setOpen(false);
    setSelectedMeeting(null);
  };

  return (
    <Layout>
      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-5xl font-bold app-title">
            Meetings 👥
          </h1>

          <p className="app-muted mt-2">
            Manage your meetings and schedules.
          </p>
        </div>

        <button
          onClick={handleAddMeeting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          + Add Meeting
        </button>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="app-card rounded-2xl shadow p-16 text-center">
          <p className="app-muted text-lg font-semibold">
            Loading Meetings...
          </p>
        </div>
      ) : (
        <>
          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Scheduled */}

            <div className="app-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="app-muted font-medium">
                    Scheduled
                  </p>

                  <h2 className="text-3xl font-bold mt-2 app-title">
                    {scheduledCount}
                  </h2>
                </div>

                <div className="text-3xl">
                  📅
                </div>
              </div>
            </div>

            {/* Completed */}

            <div className="app-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="app-muted font-medium">
                    Completed
                  </p>

                  <h2 className="text-3xl font-bold mt-2 app-title">
                    {completedCount}
                  </h2>
                </div>

                <div className="text-3xl">
                  ✅
                </div>
              </div>
            </div>

            {/* Cancelled */}

            <div className="app-card rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="app-muted font-medium">
                    Cancelled
                  </p>

                  <h2 className="text-3xl font-bold mt-2 app-title">
                    {cancelledCount}
                  </h2>
                </div>

                <div className="text-3xl">
                  ❌
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Meetings */}

          {upcomingMeetings.length > 0 && (
            <div className="app-card rounded-2xl shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-xl font-bold app-title">
                    📅 Upcoming Meetings
                  </h2>

                  <p className="app-muted text-sm mt-1">
                    Your next scheduled meetings.
                  </p>
                </div>

                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {upcomingMeetings.length}
                </span>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {upcomingMeetings
                  .slice(0, 3)
                  .map((meeting) => (
                    <div
                      key={meeting._id}
                      className="border rounded-xl p-5 hover:shadow-md transition"
                    >
                      {/* Header */}

                      <div className="flex justify-between items-start">
                        <div className="min-w-0">
                          <h3 className="font-bold text-lg app-title truncate">
                            {meeting.title}
                          </h3>

                          <p className="app-muted text-sm mt-1">
                            {meeting.type}
                          </p>
                        </div>

                        <span className="text-2xl ml-3">
                          👥
                        </span>
                      </div>

                      {/* Details */}

                      <div className="mt-4 space-y-2 text-sm app-title">
                        <p>
                          📅{" "}
                          {new Date(
                            meeting.date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>

                        <p>
                          🕐{" "}
                          {meeting.startTime ||
                            "--"}

                          {meeting.endTime &&
                            ` - ${meeting.endTime}`}
                        </p>

                        {meeting.location && (
                          <p className="truncate">
                            📍 {meeting.location}
                          </p>
                        )}

                        {meeting.participants?.length >
                          0 && (
                          <p>
                            👤{" "}
                            {
                              meeting
                                .participants
                                .length
                            }{" "}
                            participant
                            {meeting
                              .participants
                              .length !== 1
                              ? "s"
                              : ""}
                          </p>
                        )}
                      </div>

                      {/* Actions */}

                      <div className="flex gap-2 mt-5">
                        <button
                          onClick={() =>
                            handleEditMeeting(
                              meeting
                            )
                          }
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleMarkCompleted(
                              meeting
                            )
                          }
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                        >
                          ✓ Done
                        </button>
                      </div>

                      {meeting.meetingLink && (
                        <a
                          href={
                            meeting.meetingLink
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="block bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-center mt-2 transition"
                        >
                          🔗 Join Meeting
                        </a>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Search / Filter */}

          <div className="app-card rounded-2xl shadow-md p-5 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search meetings..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="flex-1 border rounded-xl p-3 bg-transparent"
              />

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                className="border rounded-xl p-3 bg-transparent"
              >
                <option value="All">
                  All
                </option>

                <option value="Scheduled">
                  Scheduled
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>
          </div>

          {/* Meetings Table */}

          <div className="app-card rounded-2xl shadow-md overflow-hidden">
            {filteredMeetings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">
                  👥
                </p>

                <p className="text-lg font-semibold app-title">
                  No meetings found.
                </p>

                <p className="app-muted mt-2">
                  Create your first meeting to
                  get started.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 text-left">
                        Meeting
                      </th>

                      <th className="p-4 text-center">
                        Date
                      </th>

                      <th className="p-4 text-center">
                        Time
                      </th>

                      <th className="p-4 text-center">
                        Type
                      </th>

                      <th className="p-4 text-center">
                        Status
                      </th>

                      <th className="p-4 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredMeetings.map(
                      (meeting) => (
                        <tr
                          key={meeting._id}
                          className="border-t hover:bg-gray-50"
                        >
                          {/* Meeting */}

                          <td className="p-4">
                            <div className="font-semibold app-title">
                              {meeting.title}
                            </div>

                            {meeting.location && (
                              <div className="text-sm app-muted">
                                📍{" "}
                                {meeting.location}
                              </div>
                            )}

                            {meeting
                              .participants
                              ?.length > 0 && (
                              <div className="text-xs app-muted mt-1">
                                👤{" "}
                                {
                                  meeting
                                    .participants
                                    .length
                                }{" "}
                                participant
                                {meeting
                                  .participants
                                  .length !==
                                1
                                  ? "s"
                                  : ""}
                              </div>
                            )}
                          </td>

                          {/* Date */}

                          <td className="text-center whitespace-nowrap app-title">
                            {new Date(
                              meeting.date
                            ).toLocaleDateString(
                              "en-IN"
                            )}
                          </td>

                          {/* Time */}

                          <td className="text-center whitespace-nowrap app-title">
                            {meeting.startTime ||
                              "--"}

                            {meeting.endTime &&
                              ` - ${meeting.endTime}`}
                          </td>

                          {/* Type */}

                          <td className="text-center app-title">
                            {meeting.type}
                          </td>

                          {/* Status */}

                          <td className="text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                meeting.status ===
                                "Scheduled"
                                  ? "bg-blue-100 text-blue-700"
                                  : meeting.status ===
                                    "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {meeting.status}
                            </span>
                          </td>

                          {/* Actions */}

                          <td className="text-center whitespace-nowrap">
                            {meeting.meetingLink && (
                              <a
                                href={
                                  meeting.meetingLink
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2 inline-block"
                              >
                                Join
                              </a>
                            )}

                            {meeting.status ===
                              "Scheduled" && (
                              <button
                                onClick={() =>
                                  handleMarkCompleted(
                                    meeting
                                  )
                                }
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded mr-2"
                              >
                                ✓ Done
                              </button>
                            )}

                            <button
                              onClick={() =>
                                handleEditMeeting(
                                  meeting
                                )
                              }
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  meeting
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Add / Edit Meeting Modal */}

      <AddMeetingModal
        isOpen={open}
        onClose={handleCloseModal}
        refreshMeetings={fetchMeetings}
        meetingToEdit={selectedMeeting}
      />
    </Layout>
  );
};

export default Meetings;