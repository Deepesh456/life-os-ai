import { useEffect, useState } from "react";
import {
  createNote,
  updateNote,
} from "../../services/noteService";

const defaultNote = {
  title: "",
  content: "",
  category: "Personal",
  favorite: false,
  pinned: false,
};

const AddNoteModal = ({
  isOpen,
  onClose,
  refreshNotes,
  noteToEdit,
}) => {
  const [note, setNote] = useState(defaultNote);

  const isEditing = !!noteToEdit?._id;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditing) {
      setNote({
        title: noteToEdit.title || "",
        content: noteToEdit.content || "",
        category: noteToEdit.category || "Personal",
        favorite: noteToEdit.favorite || false,
        pinned: noteToEdit.pinned || false,
      });
    } else {
      setNote({ ...defaultNote });
    }
  }, [isOpen, noteToEdit, isEditing]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNote((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!note.title.trim()) {
      return alert("Please enter a note title.");
    }

    try {
      if (isEditing) {
        await updateNote(noteToEdit._id, note);
      } else {
        await createNote(note);
      }

      await refreshNotes();

      setNote({ ...defaultNote });

      onClose();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to save note."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="
          app-card
          rounded-2xl
          w-[650px]
          max-w-[95%]
          shadow-2xl
          p-8
          max-h-[90vh]
          overflow-y-auto
        "
      >
        <h2 className="text-3xl font-bold mb-6 app-title">
          {isEditing ? "Edit Note" : "Create Note"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Note Title"
          value={note.title}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            app-input
          "
        />

        <select
          name="category"
          value={note.category}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            app-input
          "
        >
          <option>Personal</option>
          <option>Work</option>
          <option>Study</option>
          <option>Finance</option>
          <option>Health</option>
          <option>Meeting</option>
          <option>Ideas</option>
          <option>Others</option>
        </select>

        <textarea
          rows="8"
          name="content"
          placeholder="Write your note here..."
          value={note.content}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-lg
            p-3
            mb-5
            resize-none
            app-input
          "
        />

        <div className="flex gap-8 mb-6">
          <label className="flex items-center gap-2 cursor-pointer app-title">
            <input
              type="checkbox"
              name="favorite"
              checked={note.favorite}
              onChange={handleChange}
            />
            ⭐ Favorite
          </label>

          <label className="flex items-center gap-2 cursor-pointer app-title">
            <input
              type="checkbox"
              name="pinned"
              checked={note.pinned}
              onChange={handleChange}
            />
            📌 Pin Note
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-6
              py-2
              rounded-lg
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
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
            {isEditing ? "Update Note" : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;