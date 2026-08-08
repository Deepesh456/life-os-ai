const MeetingCard = () => {
  return (
    <div className="app-card rounded-2xl shadow-md p-6 transition-colors duration-300">

      <h2 className="text-xl font-bold mb-5 app-title">
        📅 Upcoming Deadlines
      </h2>

      <div className="app-muted">
        No upcoming meetings.
      </div>

      <div className="mt-6 text-sm app-primary">
        Meeting module coming soon...
      </div>

    </div>
  );
};

export default MeetingCard;