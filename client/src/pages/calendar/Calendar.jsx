import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/layout/Layout";
import AddEventModal from "../../components/calendar/AddEventModal";

import {
  Calendar,
  dateFnsLocalizer,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";

import enUS from "date-fns/locale/en-US";

import {
  getEvents,
  deleteEvent,
} from "../../services/eventService";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] =
    useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();

      setEvents(
        res.data.events || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  const calendarEvents = useMemo(() => {
    return events
      .filter(
        (event) =>
          event.date
      )
      .map((event) => {
        const date =
          event.date.slice(0, 10);

        return {
          ...event,

          start: new Date(
            `${date}T${
              event.startTime ||
              "00:00"
            }`
          ),

          end: new Date(
            `${date}T${
              event.endTime ||
              "23:59"
            }`
          ),
        };
      });
  }, [events]);

  const handleDelete = async (event) => {
    try {
      await deleteEvent(event._id);

      await fetchEvents();
    } catch (err) {
      console.error(err);

      alert(
        "Failed to delete event."
      );
    }
  };

  return (
    <Layout>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-5xl font-bold app-title">
            Calendar 📅
          </h1>

          <p className="app-muted mt-2">
            Organize your life.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedEvent(null);
            setOpen(true);
          }}
          className="
            bg-purple-600
            text-white
            px-6
            py-3
            rounded-xl
            hover:bg-purple-700
            transition
            shadow-md
          "
        >
          + New Event
        </button>

      </div>


      {/* Calendar */}

      <div className="app-card rounded-2xl shadow-lg p-5 h-[700px] transition-colors duration-300">

        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          popup
          selectable
          style={{
            height: "100%",
          }}

          onSelectEvent={(event) => {
            setSelectedEvent(event);
            setOpen(true);
          }}

          onSelectSlot={(slotInfo) => {
            setSelectedEvent({
              date: slotInfo.start
                .toISOString()
                .slice(0, 10),
            });

            setOpen(true);
          }}

          eventPropGetter={(event) => ({
            style: {
              backgroundColor:
                event.color ||
                "#7C3AED",

              borderRadius: "8px",

              border: "none",

              color: "white",

              padding: "2px 6px",
            },
          })}
        />

      </div>


      {/* Event Modal */}

      <AddEventModal
        isOpen={open}

        onClose={() => {
          setOpen(false);
          setSelectedEvent(null);
        }}

        refreshEvents={
          fetchEvents
        }

        eventToEdit={
          selectedEvent
        }

        onDelete={
          handleDelete
        }
      />

    </Layout>
  );
};

export default CalendarPage;