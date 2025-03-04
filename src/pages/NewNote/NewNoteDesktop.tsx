import PageDesktopHeader from "../../components/pageHeader/PageDesktopHeader";
import Sidebar from "../../components/SettingsMenu/SettingsMenu";
import ChangeModeBtn from "../../components/ChangeModeBtn/ChangeModeBtn";
import { Notes } from "../../../public/api/types.ts";
import AllNotesDesktop from "../../components/allNotes/AllNotesDesktop";
import CreateNewNote from "../../components/CreateNewNote/CreateNewNote.tsx";

interface NewNoteDesktopProps {
  note: Notes;
  setNote: (note: Notes) => void;
}

const NewNoteDesktop = ({ note, setNote }: NewNoteDesktopProps) => {
  return (
    <div className="NotesPageDesktop">
      <Sidebar />
      <main className="NotesPageDesktop">
        <PageDesktopHeader page={"All Notes"} />
        <div className="notesContainer">
          <AllNotesDesktop />
          <CreateNewNote setNote={setNote} />
        </div>
      </main>
      {/* <ChangeModeBtn /> */}
    </div>
  );
};

export default NewNoteDesktop;
