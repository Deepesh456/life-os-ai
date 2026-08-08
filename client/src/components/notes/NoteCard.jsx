import {
  FaStar,
  FaRegStar,
  FaTrash,
  FaEdit,
  FaThumbtack,
} from "react-icons/fa";

const categoryColors = {
  Personal: "bg-blue-500/20 text-blue-300",
  Work: "bg-purple-500/20 text-purple-300",
  Study: "bg-green-500/20 text-green-300",
  Finance: "bg-yellow-500/20 text-yellow-300",
  Health: "bg-red-500/20 text-red-300",
  Meeting: "bg-pink-500/20 text-pink-300",
  Ideas: "bg-indigo-500/20 text-indigo-300",
  Others: "bg-gray-500/20 text-gray-300",
};

const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onFavorite,
  onPin,
}) => {
  return (
    <div
      className="
        app-card
        rounded-2xl
        shadow-md
        p-6
        hover:shadow-lg
        transition-all
        duration-200
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 min-w-0">

          {note.pinned && (
            <FaThumbtack
              className="text-orange-400 flex-shrink-0"
              title="Pinned"
            />
          )}

          <h2 className="font-bold text-lg app-title truncate">
            {note.title}
          </h2>

        </div>

        <button
          onClick={() => onFavorite(note._id)}
          title="Favorite"
          className="ml-3"
        >
          {note.favorite ? (
            <FaStar className="text-yellow-400 text-xl" />
          ) : (
            <FaRegStar className="text-gray-400 hover:text-yellow-400 text-xl transition" />
          )}
        </button>
      </div>

      {/* Category */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
          categoryColors[note.category] ||
          "bg-gray-500/20 text-gray-300"
        }`}
      >
        {note.category}
      </span>

      {/* Content */}
      <p className="app-muted whitespace-pre-wrap min-h-[90px] line-clamp-5">
        {note.content || "No content"}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5">

        <small className="app-muted">
          Updated{" "}
          {new Date(note.updatedAt).toLocaleDateString()}
        </small>

        <div className="flex gap-2">

          {/* Pin */}
          <button
            onClick={() => onPin(note._id)}
            title={note.pinned ? "Unpin" : "Pin"}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              note.pinned
                ? "bg-orange-500 text-white"
                : "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
            }`}
          >
            📌
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(note)}
            title="Edit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
          >
            <FaEdit />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(note)}
            title="Delete"
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
          >
            <FaTrash />
          </button>

        </div>

      </div>
    </div>
  );
};

export default NoteCard;