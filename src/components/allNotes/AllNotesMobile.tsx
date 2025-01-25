import "./_AllNotes.scss";
// import { useMode } from "../../context/ModeContext.tsx";
// import localforage from "localforage";
import { useState, useEffect, useContext } from "react";
import fetchData from "../../services/fetchData.tsx";
import { Notes } from "../../../public/api/types.ts";
import { UserContext } from "../../context/AuthContext.tsx";

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
  const user = useContext(UserContext);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchData<Notes[]>("/api/data/notes.json");
        const userNotes = data.filter((note) => note.userId === user.id);
        setNotes(userNotes);
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

  // const { mode } = useMode();
  //   const color = getComputedStyle(document.documentElement).getPropertyValue(
  //     mode === "dark" ? "--Neutral400" : "--Neutral500"
  //   );
  // const useColor = mode === "dark" ? "#FFFFFF" : "#0E121B";

  return (
    <div className="allNotesBackground">
      <div className="allNotesMobile">
        <h2>All Notes</h2>
        {notes.map((note) => (
          <NoteCard key={note.noteId} note={note} />
        ))}
      </div>
    </div>
  );
};

const NoteCard: React.FC<{ note: Notes }> = ({ note }) => (
  <div className="note-card">
    <h3>{note.heading}</h3>
    <div className="tags">
      {note.tags.map((tag: string) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>
    <p className="date">{formatDate(note.lastEdited)}</p>
  </div>
);

export default AllNotesMobile;
