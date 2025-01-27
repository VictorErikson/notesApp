import MenuBarMobile from "../../components/Mobile/MenuBarMobile/MenuBarMobile";
import PageHeaderMobile from "../../components/pageHeader/PageHeaderMobile";
import NoteTopMenuMobile from "../../components/NoteTopMenuMobile/NoteTopMenuMobile";
import CreateNewNote from "../../components/CreateNewNote/CreateNewNote";

const NewNoteTabletMobile = () => {
  return (
    <main className="mainHomeTablet">
      <PageHeaderMobile />
      <div className="notesBackground">
        <div className="newNote">
          <NoteTopMenuMobile />
          <CreateNewNote />
        </div>
      </div>
      <MenuBarMobile />
    </main>
  );
};

export default NewNoteTabletMobile;
