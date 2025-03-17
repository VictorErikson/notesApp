import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Notes } from "../../../public/api/types.ts";
import Note from "../../components/Note/Note.tsx";
import fetchData from "../../services/fetchData.tsx";
import DesktopNoteMenu from "../../components/desktop/desktopNoteMenu/desktopNoteMenu.tsx";
import ArchiveDeleteMenu from "../../components/desktop/ArchiveDeleteMenu/ArciveDeleteMenu.tsx";
import LoadingMsg from "../../components/LoadingMsg/LoadingMsg.tsx";

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
    return (
      <LoadingMsg
        msg={"Loading your note. Hang tight, this may take a little while."}
        loadingSymbol={true}
      />
    );
  }

  if (!note) {
    return <LoadingMsg msg={"Error: Note not found"} loadingSymbol={false} />;
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
