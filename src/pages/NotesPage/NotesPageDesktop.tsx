import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Notes } from "../../../public/api/types.ts";
import PageDesktopHeader from "../../components/pageHeader/PageDesktopHeader";
import Sidebar from "../../components/SettingsMenu/SettingsMenu";
import AllNotesDesktop from "../../components/allNotes/AllNotesDesktop";
import notesPage from "./_notesPage.scss";
import Note from "../../components/Note/Note.tsx";
import fetchData from "../../services/fetchData.tsx";
import SavedMsg from "../../components/SavedMsg/SavedMsg.tsx";
import DesktopNoteMenu from "../../components/desktop/desktopNoteMenu/desktopNoteMenu.tsx";

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
    <div className="NotesPageDesktop">
      <Sidebar />
      <main className="NotesPageDesktop">
        <PageDesktopHeader page={"All Notes"} />
        <div className="notesContainer">
          <AllNotesDesktop setNote={setNote} note={note} />
          <div className="notes">
            <Note setNote={setNote} note={note} />
            <hr></hr>
            <DesktopNoteMenu />
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotesPageDesktop;
