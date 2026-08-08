import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/layout/Layout";
import AddNoteModal from "../../components/notes/AddNoteModal";
import NoteCard from "../../components/notes/NoteCard";

import {
  getNotes,
  deleteNote,
  toggleFavorite,
  togglePinned,
} from "../../services/noteService";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data.notes || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (note) => {
    const confirmDelete = window.confirm(
      "Delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await deleteNote(note._id);
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavorite = async (id) => {
    try {
      await toggleFavorite(id);
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePin = async (id) => {
    try {
      await togglePinned(id);
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        note.content
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        note.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [notes, search, category]);

  return (
    <Layout>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-5xl font-bold app-title">
            My Notes 📝
          </h1>

          <p className="app-muted mt-2">
            Organize your ideas and important notes.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedNote(null);
            setOpen(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition"
        >
          + New Note
        </button>

      </div>

      {/* Search & Filter */}

      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 border rounded-xl p-3 app-input"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="border rounded-xl p-3 app-input"
        >
          <option>All</option>
          <option>Personal</option>
          <option>Work</option>
          <option>Study</option>
          <option>Finance</option>
          <option>Health</option>
          <option>Meeting</option>
          <option>Ideas</option>
          <option>Others</option>
        </select>

      </div>

      {/* Notes */}

      {filteredNotes.length === 0 ? (

        <div className="app-card rounded-2xl shadow p-16 text-center">

          <h2 className="text-2xl font-bold app-title">
            No Notes Found
          </h2>

          <p className="app-muted mt-2">
            Create your first note to get started.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredNotes.map((note) => (

            <NoteCard
              key={note._id}
              note={note}
              onEdit={(note) => {
                setSelectedNote(note);
                setOpen(true);
              }}
              onDelete={handleDelete}
              onFavorite={handleFavorite}
              onPin={handlePin}
            />

          ))}

        </div>

      )}

      {/* Modal */}

      <AddNoteModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelectedNote(null);
        }}
        refreshNotes={fetchNotes}
        noteToEdit={selectedNote}
      />

    </Layout>
  );
};

export default Notes;