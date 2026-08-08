const CalendarCard = () => {
  return (
    <div className="app-card rounded-2xl shadow-md p-6 transition-colors duration-300">

      <h2 className="text-xl font-bold mb-5 app-title">
        📅 Today's Calendar
      </h2>

      <div className="app-muted">
        No events scheduled for today.
      </div>

      <div className="mt-6 text-sm app-primary">
        Calendar module available from the sidebar.
      </div>

    </div>
  );
};

export default CalendarCard;