import "./_AllNotes.scss";
// import { useMode } from "../../context/ModeContext.tsx";
// import localforage from "localforage";
import { useState, useEffect, useContext } from "react";
import fetchData from "../../services/fetchData.tsx";
import { Notes } from "../../../public/api/types.ts";
import { UserContext } from "../../context/AuthContext.tsx";
import IconPlus from "../Images/icon-plus.tsx";
import { useNavigate } from "react-router-dom";

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

  //navigate
  const navigate = useNavigate();

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchData<Notes[]>("http://localhost:5000/notes");
        const userNotes = data.filter((note) => note.userId === user.id);
        setNotes(userNotes);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, [user.id]);

  //hiding previous hr when hovering
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>(".note-card");

    buttons.forEach((button) => {
      const handleMouseEnter = () => {
        const prevHr = button.previousElementSibling as HTMLElement | null;
        if (prevHr && prevHr.tagName.toLowerCase() === "hr") {
          prevHr.style.visibility = "hidden";
        }
      };

      const handleMouseLeave = () => {
        const prevHr = button.previousElementSibling as HTMLElement | null;
        if (prevHr && prevHr.tagName.toLowerCase() === "hr") {
          prevHr.style.visibility = "visible";
        }
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup function to remove event listeners when component unmounts
      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [notes]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="notesBackground">
      <div className="allNotesMobile">
        <h2>All Notes</h2>
        <div className="notes-container">
          {notes.length > 0 ? (
            notes.map((note) => <NoteCard key={note.id} note={note} />)
          ) : (
            <div className="no-notes-container">
              <h3 className="no-notes">
                You don't have any notes yet. Start a new note to capture your
                thoughts and ideas.
              </h3>
              <hr></hr>
            </div>
          )}
        </div>
        <button onClick={() => navigate("/notes/new")} className="create-note">
          <IconPlus size={32} color={"#FFF"}></IconPlus>
        </button>
      </div>
    </div>
  );
};

const NoteCard: React.FC<{ note: Notes }> = ({ note }) => (
  <>
    <button className="note-card">
      <h3>{note.heading}</h3>
      <div className="tags">
        {note.tags.map((tag: string) => (
          <a key={tag} className="tag">
            {tag}
          </a>
        ))}
      </div>
      <p className="date">{formatDate(note.lastEdited)}</p>
    </button>
    <hr></hr>
  </>
);

export default AllNotesMobile;
