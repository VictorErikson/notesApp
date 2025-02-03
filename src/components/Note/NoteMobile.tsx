import MenuBarMobile from "../../components/Mobile/MenuBarMobile/MenuBarMobile";
import PageHeaderMobile from "../../components/pageHeader/PageHeaderMobile";
import NoteTopMenuMobile from "../../components/NoteTopMenuMobile/NoteTopMenuMobile";
import CreateNewNote from "../../components/CreateNewNote/CreateNewNote";

interface Note {
  title: string;
  tags: string;
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
          <CreateNewNote setNote={setNote} />
        </div>
      </div>
      <MenuBarMobile />
    </main>
  );
};

export default NewNoteTabletMobile;
