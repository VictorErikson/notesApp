import PageDesktopHeader from "../../components/pageHeader/PageDesktopHeader";
import Sidebar from "../../components/SettingsMenu/SettingsMenu";
import ChangeModeBtn from "../../components/ChangeModeBtn/ChangeModeBtn";
import AllNotesDesktop from "../../components/allNotes/AllNotesDesktop";
import "./_home.scss";
// import { useState } from "react";
// import { Notes } from "../../../public/api/types";
// import NewNote from "../NewNote/NewNote";
// import Note from "../../components/Note/Note";

const HomeDesktop = () => {
  // const [creatingNewNote, setCreatingNewNote] = useState(false);
  // const [selectedNote, setSelectedNote] = useState<Notes | null>(null);

  // const handleCreateNewNote = () => {
  //   setSelectedNote(null);
  //   setCreatingNewNote(true);
  // };

  // // Handle selecting an existing note
  // const handleSelectNote = (note: Notes) => {
  //   setCreatingNewNote(false);
  //   setSelectedNote(note);
  // };

  return (
    <div className="homeDesktop">
      <Sidebar />
      <main className="mainHomeDesktop">
        <PageDesktopHeader page={"All Notes"} />
        <div className="notesContianer">
          <AllNotesDesktop />
          {/* <AllNotesDesktop
            onCreateNewNote={handleCreateNewNote}
            onSelectNote={handleSelectNote}
          /> */}
          {/* {creatingNewNote && <NewNote />}
          {selectedNote && <Note note={selectedNote} />} */}
          <ChangeModeBtn />
        </div>
      </main>
    </div>
  );
};

export default HomeDesktop;
