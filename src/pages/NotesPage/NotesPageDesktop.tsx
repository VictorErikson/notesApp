import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Notes } from "../../../public/api/types.ts";
import notesPage from "./_notesPage.scss";
import Note from "../../components/Note/Note.tsx";
import fetchData from "../../services/fetchData.tsx";
import SavedMsg from "../../components/SavedMsg/SavedMsg.tsx";
import DesktopNoteMenu from "../../components/desktop/desktopNoteMenu/desktopNoteMenu.tsx";
import ArchiveDeleteMenu from "../../components/desktop/ArchiveDeleteMenu/ArciveDeleteMenu.tsx";

interface NoteProps {
  noteId?: string;
  note: Notes | null;
  setNote: (note: Notes) => void;
}

const NotesPageDesktop = ({ noteId, note, setNote }: NoteProps) => {
  const [loading, setLoading] = useState(true);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadNote = async () => {
      try {
        const fetchedNote = await fetchData<Notes>(
          `https://notesdb-a0dv.onrender.com/notes/${noteId}`
        );
        setNote(fetchedNote);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    if (noteId) {
      loadNote();
    }
  }, [noteId]);

  useEffect(() => {
    if (location.state?.showSavedMsg) {
      setShowSavedMsg(true);
      setTimeout(() => setShowSavedMsg(false), 3000);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>Error: Note not found</div>;
  }

  return (
    <div className="notesPageDesktop">
      <div className="notes">
        <Note setNote={setNote} note={note} />
        <div className="noteMenuCont">
          <hr></hr>
          <DesktopNoteMenu />
        </div>
      </div>
      <ArchiveDeleteMenu />
    </div>
  );
};

export default NotesPageDesktop;
