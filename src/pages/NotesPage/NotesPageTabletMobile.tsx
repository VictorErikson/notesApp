import { useEffect, useState } from "react";
import MenuBarMobile from "../../components/Mobile/MenuBarMobile/MenuBarMobile";
import PageHeaderMobile from "../../components/pageHeader/PageHeaderMobile";
import NoteTopMenuMobile from "../../components/NoteTopMenuMobile/NoteTopMenuMobile";
import Note from "../../components/Note/Note.tsx";
import fetchData from "../../services/fetchData.tsx";
import { Notes } from "../../../public/api/types.ts";

interface NoteProps {
  noteId: string;
  setNote: (note: Notes) => void;
  note: Notes;
}

const NotesPageTabletMobile = ({ noteId, setNote, note }: NoteProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const fetchedNote = await fetchData<Notes>(
          `http://localhost:5000/notes/${noteId}`
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>Error: Note not found</div>;
  }
  return (
    <main className="mainHomeTablet">
      <PageHeaderMobile />
      <div className="notesBackground">
        <div className="newNote">
          <NoteTopMenuMobile
            note={note}
            create={false}
            showErase={true}
            showArchive={true}
            showRestore={false}
          />
          <Note setNote={setNote} note={note} />
        </div>
      </div>
      <MenuBarMobile />
    </main>
  );
};

export default NotesPageTabletMobile;
