import { Notes } from "../../../public/api/types.ts";
import CreateNewNote from "../../components/CreateNewNote/CreateNewNote.tsx";
import DesktopNoteMenu from "../../components/desktop/desktopNoteMenu/DesktopNoteMenu.tsx";

interface NewNoteDesktopProps {
  note: Notes;
  setNote: (note: Notes) => void;
}

const NewNoteDesktop = ({ note, setNote }: NewNoteDesktopProps) => {
  return (
    <div className="notesPageDesktop">
      <div className="notes">
        <CreateNewNote setNote={setNote} />
        <div className="noteMenuCont">
          <hr></hr>
          <DesktopNoteMenu />
        </div>
      </div>
    </div>
  );
};

export default NewNoteDesktop;
