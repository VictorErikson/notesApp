import "./_AllNotes.scss";
import { useState, useEffect, useContext, useRef } from "react";
import fetchData from "../../services/fetchData.tsx";
import { Notes } from "../../../public/api/types.ts";
import { UserContext } from "../../context/AuthContext.tsx";
import { useNavigate, useParams } from "react-router-dom";
import LoadingMsg from "../LoadingMsg/LoadingMsg.tsx";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
interface NoteProps {
  note?: Notes;
  setNote?: (note: Notes) => void;
}

// const AllNotesMobile = () => {
const AllNotesMobile: React.FC<NoteProps> = ({ note, setNote }) => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useContext(UserContext);
  const { noteId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchData<Notes[]>(
          "https://notesdb-a0dv.onrender.com/notes"
        );
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

    const handleMouseEnter = (event: Event) => {
      const hoveredButton = event.currentTarget as HTMLButtonElement;
      const hr = hoveredButton.previousElementSibling as HTMLElement | null;

      if (!hr || hr.tagName.toLowerCase() !== "hr") return;

      const noteBefore = hr.previousElementSibling as HTMLElement | null;
      if (noteBefore?.classList.contains("selected-note")) {
        return;
      }

      hr.style.visibility = "hidden";
    };

    const handleMouseLeave = (event: Event) => {
      const hoveredButton = event.currentTarget as HTMLButtonElement;

      if (hoveredButton.classList.contains("selected-note")) {
        return;
      }

      const hr = hoveredButton.previousElementSibling as HTMLElement | null;
      if (!hr || hr.tagName.toLowerCase() !== "hr") return;

      const noteBefore = hr.previousElementSibling as HTMLElement | null;
      if (noteBefore?.classList.contains("selected-note")) {
        return;
      }

      hr.style.visibility = "visible";
    };

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [notes]);

  if (loading)
    return (
      <LoadingMsg
        msg={"Loading your notes. Hang tight, this may take a little while."}
        loadingSymbol={true}
      />
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="notesBackground, desktop">
      <div className="allNotes">
        <button
          onClick={() => navigate("/notes/new")}
          className="create-note-desktop"
        >
          + Create New Note
        </button>
        <div className="notes-container">
          {notes.length > 0 ? (
            notes.map((note) => {
              const isSelected = noteId === note.id;
              return (
                <NoteCard
                  key={note.id}
                  note={note}
                  setNote={setNote}
                  isSelected={isSelected}
                />
              );
            })
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
      </div>
    </div>
  );
};

const NoteCard: React.FC<{
  note: Notes;
  setNote?: (note: Notes) => void;
  isSelected: boolean;
}> = ({ note, setNote, isSelected }) => {
  const navigate = useNavigate();
  const noteRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isSelected && noteRef.current) {
      const button = noteRef.current;

      const prevHr = button.previousElementSibling as HTMLElement | null;
      if (prevHr && prevHr.tagName.toLowerCase() === "hr") {
        prevHr.style.visibility = "hidden";
      }

      // Hide the next <hr>
      const nextHr = button.nextElementSibling as HTMLElement | null;
      if (nextHr && nextHr.tagName.toLowerCase() === "hr") {
        nextHr.style.visibility = "hidden";
      }

      return () => {
        if (prevHr) prevHr.style.visibility = "visible";
        if (nextHr) nextHr.style.visibility = "visible";
      };
    }
  }, [isSelected]);

  return (
    <>
      <button
        ref={noteRef}
        className={`note-card ${isSelected ? "selected-note" : ""}`}
        onClick={() => {
          if (setNote) {
            setNote(note);
          }
          navigate(`/notes/${note.id}`);
        }}
      >
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
};

export default AllNotesMobile;
