import "./_AllNotes.scss";
import { useMode } from "../../context/ModeContext.tsx";
// import localforage from "localforage";
import { useState, useEffect } from "react";
import fetchData from "../../services/fetchData.tsx";
import { Notes } from "../../../public/api/types.ts";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const AllNotesMobile = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchData<Notes[]>("/api/data/notes.json");
        setNotes(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  // useEffect(() => {
  //   localforage.getItem("notes").then((storedNotes) => {
  //     if (storedNotes) setNotes(storedNotes);
  //   });
  // }, []);

  const { mode } = useMode();
  //   const color = getComputedStyle(document.documentElement).getPropertyValue(
  //     mode === "dark" ? "--Neutral400" : "--Neutral500"
  //   );
  // const useColor = mode === "dark" ? "#FFFFFF" : "#0E121B";

  return (
    <div className="allNotesMobile">
      {notes.map((note) => (
        <NoteCard key={note.noteId} note={note} />
      ))}
    </div>
  );
};

const NoteCard = ({ note }) => (
  <div className="note-card">
    <h2>{note.heading}</h2>
    <div>
      {note.tags.map((tag: string) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
    <p>{formatDate(note.lastEdited)}</p>
  </div>
);

export default AllNotesMobile;
