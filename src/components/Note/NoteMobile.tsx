import MenuBarMobile from "../../components/Mobile/MenuBarMobile/MenuBarMobile";
import PageHeaderMobile from "../../components/pageHeader/PageHeaderMobile";
import NoteTopMenuMobile from "../../components/NoteTopMenuMobile/NoteTopMenuMobile";
import Note from "../../components/Note/Note";
import { Notes } from "../../../public/api/types.ts";

// interface Note {
//   id: string;
//   userId: string;
//   heading: string;
//   tags: string[];
//   lastEdited: string;
//   text: string;
// }

interface NewNoteTabletMobileProps {
  note: Notes;
  setNote: (note: Notes) => void;
}

const NewNoteTabletMobile = ({ note, setNote }: NewNoteTabletMobileProps) => {
  return (
    <main className="mainHomeTablet">
      <PageHeaderMobile />
      <div className="notesBackground">
        <div className="newNote">
          <NoteTopMenuMobile
            note={note}
            showErase={true}
            showArchive={true}
            showRestore={false}
            create={false}
          />
          <Note note={note} setNote={setNote} />
        </div>
      </div>
      <MenuBarMobile />
    </main>
  );
};

export default NewNoteTabletMobile;
