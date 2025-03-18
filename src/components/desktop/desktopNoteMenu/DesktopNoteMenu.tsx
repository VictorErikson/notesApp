import { useState, useEffect, ReactNode, useContext } from "react";
import "./_desktopNoteMenu.scss";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import WarningMsg from "../../WarningMsg/WarningMsg";
import { useNavigate } from "react-router-dom";
import { useMode } from "../../../context/ModeContext.tsx";
import Iconinfo from "../../Images/icon-info";
import { Notes } from "../../../../public/api/types";
import fetchData from "../../../services/fetchData.tsx";
import { saveNote, saveNoteFirstTime } from "../../../services/saveNote.tsx";
import { UserContext } from "../../../context/AuthContext.tsx";

interface Props {
  note: Notes;
  create: boolean;
  setShowSavedMsg?: (value: boolean) => void;
}

const DesktopNoteMenu: React.FC<Props> = ({
  note,
  create,
  setShowSavedMsg,
}) => {
  const user = useContext(UserContext);
  const { mode } = useMode();
  const navigate = useNavigate();

  const [showWarningMsg, setShowWarningMsg] = useState(false);
  const [textWarning, setTextWarning] = useState("");
  const [warningTitle, setWarningTitle] = useState("");

  const cancelBtnWarning = (
    <button className="cancel" onClick={() => setShowWarningMsg(false)}>
      Continue
    </button>
  );
  const [showDeleteMsg, setShowDeleteMsg] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [textDelete, setTextDelete] = useState("");
  const [imgComponentDelete, setImgComponentDelete] = useState<ReactNode>(null);
  const [cancelBtn, setCancelBtn] = useState<ReactNode>(null);
  const [deleteBtn, setDeleteBtn] = useState<ReactNode>(null);

  const colorDeleteIconWarning = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--BaseWhite" : "--Neutral950");

  const handleSave = async () => {
    if (
      !note ||
      !note.heading ||
      !note.text ||
      !note.tags ||
      !note.heading.trim() ||
      !note.text.trim() ||
      note.heading === "Type here..." ||
      note.text === "Start typing your note here..." ||
      note.tags.length === 0 ||
      note.tags.includes("Add tags separated by commas (e.g. Work")
    ) {
      setShowWarningMsg(true);
      setTextWarning(
        "Cannot save an empty note. Make sure to add a title, text, and at least one valid tag."
      );
      setWarningTitle("Save Note");
      return;
    }

    if (create) {
      await saveNoteFirstTime(note, user.id, navigate);
    } else {
      await saveNote(note);
    }
    if (setShowSavedMsg) {
      setShowSavedMsg(true);
      setTimeout(() => setShowSavedMsg(false), 3000);
    }
  };

  useEffect(() => {
    if (showDeleteMsg) {
      document.body.classList.add("modal-active");
    } else {
      document.body.classList.remove("modal-active");
    }

    return () => {
      document.body.classList.remove("modal-active");
    };
  }, [showDeleteMsg]);

  let unchangedNote: Notes;

  return (
    <>
      {showDeleteMsg && (
        <>
          <ErrorMsg
            title={deleteTitle}
            text={textDelete}
            imgComponent={imgComponentDelete}
            Btn1={cancelBtn}
            Btn2={deleteBtn}
          />
          <div className="overlay"></div>
        </>
      )}
      {showWarningMsg && (
        <>
          <WarningMsg
            title={warningTitle}
            text={textWarning}
            imgComponent={<Iconinfo size={24} color={colorDeleteIconWarning} />}
            Btn1={cancelBtnWarning}
          />
          <div className="overlay"></div>
        </>
      )}
      <div className="desktopNoteMenu">
        <button className="save" onClick={handleSave}>
          Save Note
        </button>
        <button
          className="cancel"
          onClick={async () => {
            if (!create) {
              unchangedNote = await fetchData<Notes>(
                "https://notesdb-a0dv.onrender.com/notes/" + note.id
              );
            } else {
              unchangedNote = {
                heading: "",
                text: "",
                tags: [],
              };
            }
            if (
              unchangedNote.heading !== note.heading ||
              JSON.stringify(unchangedNote.tags) !==
                JSON.stringify(note.tags) ||
              unchangedNote.text !== note.text
            ) {
              setShowDeleteMsg(true);
              setDeleteTitle("Are you sure you want to cancel?");
              setTextDelete(
                "Any unsaved data will be deleted. This action cannot be undone."
              );
              setImgComponentDelete(
                <Iconinfo size={24} color={colorDeleteIconWarning} />
              );

              setCancelBtn(
                <button
                  className="continue"
                  onClick={() => {
                    setShowDeleteMsg(false);
                    navigate("/");
                  }}
                >
                  Yes, continue
                </button>
              );
              setDeleteBtn(
                <button
                  className="delete"
                  onClick={() => setShowDeleteMsg(false)}
                >
                  No, return
                </button>
              );
            } else {
              navigate("/");
            }
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default DesktopNoteMenu;
