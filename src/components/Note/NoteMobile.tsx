import MenuBarMobile from "../../components/Mobile/MenuBarMobile/MenuBarMobile";
import PageHeaderMobile from "../../components/pageHeader/PageHeaderMobile";
import NoteTopMenuMobile from "../../components/NoteTopMenuMobile/NoteTopMenuMobile";
import Note from "../../components/Note/Note";

interface Note {
  id: string;
  userId: string;
  heading: string;
  tags: string[];
  lastEdited: string;
  text: string;
}

interface NewNoteTabletMobileProps {
  note: Note;
  setNote: (note: Note) => void;
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
          />
          <Note setNote={setNote} />
        </div>
      </div>
      <MenuBarMobile />
    </main>
  );
};

export default NewNoteTabletMobile;
