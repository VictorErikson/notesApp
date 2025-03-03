import { useState } from "react";
import MenuBarMobile from "../../components/Mobile/MenuBarMobile/MenuBarMobile";
import PageHeaderMobile from "../../components/pageHeader/PageHeaderMobile";
import NoteTopMenuMobile from "../../components/NoteTopMenuMobile/NoteTopMenuMobile";
import CreateNewNote from "../../components/CreateNewNote/CreateNewNote";
import { Notes } from "../../../public/api/types.ts";

interface NewNoteTabletMobileProps {
  note: Notes;
  setNote: (note: Notes) => void;
}

const NewNoteTabletMobile = ({ note, setNote }: NewNoteTabletMobileProps) => {
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  return (
    <main className="mainHomeTablet">
      <PageHeaderMobile />
      <div className="notesBackground">
        <div className="newNote">
          <NoteTopMenuMobile
            note={note}
            create={true}
            setShowSavedMsg={setShowSavedMsg}
            showErase={false}
            showArchive={false}
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
