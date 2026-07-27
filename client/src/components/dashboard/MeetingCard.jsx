const MeetingCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-5">
        Upcoming Meetings
      </h2>

      <div className="space-y-4">
        <div>
          <p className="font-semibold">
            Project Discussion
          </p>

          <p className="text-gray-500">
            2:00 PM
          </p>
        </div>

        <div>
          <p className="font-semibold">
            Client Call
          </p>

          <p className="text-gray-500">
            Tomorrow
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;