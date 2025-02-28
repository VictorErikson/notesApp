import IconArchive from "../Images/icon-archive";
import ArrowLeft from "../Images/icon-arrow-left";
import IconDelete from "../Images/icon-delete";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/AuthContext.tsx";
import { useMode } from "../../context/ModeContext.tsx";
import "./_NoteTopMenuMobile.scss";
import { saveNote, saveNoteFirstTime } from "../../services/saveNote.tsx";
import { useNavigate } from "react-router-dom";
import { Notes } from "../../../public/api/types.ts";
import ErrorMsg from "../ErrorMsg/ErrorMsg.tsx";

interface NoteTopMenuMobileProps {
  note: Notes;
  create: boolean | null;
  showErase?: boolean;
  showArchive?: boolean;
  showRestore?: boolean;
  setShowSavedMsg: (value: boolean) => void;
}

const NoteTopMenuMobile: React.FC<NoteTopMenuMobileProps> = ({
  note,
  create,
  showErase,
  showArchive,
  showRestore,
  setShowSavedMsg,
}) => {
  const user = useContext(UserContext);
  const { mode } = useMode();
  const navigate = useNavigate();

  const colorIcons = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--Neutral300" : "--Neutral600");

  const handleSave = async () => {
    if (create) {
      await saveNoteFirstTime(note, user.id, navigate);
    } else {
      await saveNote(note);
    }
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 3000);
  };

  const deleteNote = async () => {
    try {
      const noteDeleted = await fetch(
        `http://localhost:5000/notes/${note.id}`,
        {
          method: "DELETE",
        }
      );

      if (noteDeleted.ok) {
        navigate("/", { state: { showDeletedMsg: true } });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return Promise.reject(error);
    }
  };

  const [showEraseMsg, setShowEraseMsg] = useState(false);
  const textDelete =
    "Are you sure you want to permanently delete this note? This action cannot be undone.";
  const cancelBtn = (
    <button className="cancel" onClick={() => setShowEraseMsg(false)}>
      Cancel
    </button>
  );
  const deleteBtn = (
    <button className="delete" onClick={() => deleteNote()}>
      Delete Note
    </button>
  );
  const colorDeleteIconWarning = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--BaseWhite" : "--Neutral950");

  useEffect(() => {
    if (showEraseMsg) {
      document.body.classList.add("modal-active");
    } else {
      document.body.classList.remove("modal-active");
    }

    return () => {
      document.body.classList.remove("modal-active");
    };
  }, [showEraseMsg]);

  return (
    <>
      {showEraseMsg && (
        <>
          <ErrorMsg
            title={"Delete Note"}
            text={textDelete}
            imgComponent={
              <IconDelete
                width={24}
                height={25}
                color={colorDeleteIconWarning}
              />
            }
            Btn1={cancelBtn}
            Btn2={deleteBtn}
          />
          <div className="overlay"></div>
        </>
      )}
      <div className="noteTopMenuMobile">
        <button className="back-button">
          <ArrowLeft size={18} color={colorIcons}></ArrowLeft>Go Back
        </button>
        <div className="right">
          {showErase && (
            <button className="erase" onClick={() => setShowEraseMsg(true)}>
              <IconDelete
                width={18}
                height={18}
                color={colorIcons}
              ></IconDelete>
            </button>
          )}
          {showArchive && (
            <button className="archive" onClick={() => {}}>
              <IconArchive size={18} color={colorIcons}></IconArchive>
            </button>
          )}

          <button className="cancel" onClick={() => {}}>
            Cancel
          </button>
          <button className="save" onClick={handleSave}>
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
