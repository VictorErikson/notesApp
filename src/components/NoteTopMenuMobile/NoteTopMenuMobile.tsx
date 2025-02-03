import IconArchive from "../Images/icon-archive";
import ArrowLeft from "../Images/icon-arrow-left";
import IconDelete from "../Images/icon-delete";
import { useContext } from "react";
import { UserContext } from "../../context/AuthContext.tsx";
import { useMode } from "../../context/ModeContext.tsx";
import "./_NoteTopMenuMobile.scss";
import saveNote from "../../services/saveNote.tsx";
import { useNavigate } from "react-router-dom";

interface Note {
  title: string;
  tags: string;
  text: string;
}

interface NoteTopMenuMobileProps {
  note: Note;
  showErase?: boolean;
  showArchive?: boolean;
  showRestore?: boolean;
}

const NoteTopMenuMobile: React.FC<NoteTopMenuMobileProps> = ({
  note,
  showErase,
  showArchive,
  showRestore,
}) => {
  const user = useContext(UserContext);
  const { mode } = useMode();
  const navigate = useNavigate();

  const colorIcons = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--Neutral300" : "--Neutral600");

  return (
    <>
      <div className="noteTopMenuMobile">
        <button className="back-button">
          <ArrowLeft size={18} color={colorIcons}></ArrowLeft>Go Back
        </button>
        <div className="right">
          {showErase && (
            <button className="erase">
              <IconDelete
                width={18}
                height={18}
                color={colorIcons}
              ></IconDelete>
            </button>
          )}
          {showArchive && (
            <button className="archive">
              <IconArchive size={18} color={colorIcons}></IconArchive>
            </button>
          )}

          <button className="cancel">Cancel</button>
          <button
            className="save"
            onClick={() => saveNote(note, user.id, navigate)}
          >
            Save Note
          </button>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default NoteTopMenuMobile;

// //Fix this alert
// const saveNote = async () => {
//   if (
//     !note.title.trim() ||
//     !note.text.trim() ||
//     note.title === "Type here..." ||
//     note.text === "Start typing your note here..."
//   ) {
//     alert("cannot save an empty note.");
//     return;
//   }

//   const id = user.id;

//   const newNote = {
//     noteId: uuidv4(),
//     userId: id,
//     heading: note.title,
//     tags: note.tags.split(",").map((tag) => tag.trim()),
//     lastEdited: new Intl.DateTimeFormat("sv-SE").format(new Date()),
//     text: note.text,
//   };

//   try {
//     const response = await fetch("http://localhost:5000/notes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newNote),
//     });

//     if (response.ok) {
//       console.log("Note saved successfully!");
//     } else {
//       console.error("Failed to save note");
//     }
//   } catch (error) {
//     console.error("Error saving note:", error);
//   }
// };
