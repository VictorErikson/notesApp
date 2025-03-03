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
import WarningMsg from "../WarningMsg/WarningMsg.tsx";
import Iconinfo from "../Images/icon-info.tsx";
import { ReactNode } from "react";
import fetchData from "../../services/fetchData.tsx";

interface NoteTopMenuMobileProps {
  note: Notes;
  create: boolean;
  showErase?: boolean;
  showArchive?: boolean;
  showRestore?: boolean;
  setShowSavedMsg?: (value: boolean) => void;
}

const NoteTopMenuMobile: React.FC<NoteTopMenuMobileProps> = ({
  note,
  create,
  showErase,
  showArchive,
  // showRestore,
  setShowSavedMsg,
}) => {
  const user = useContext(UserContext);
  const { mode } = useMode();
  const navigate = useNavigate();

  const colorIcons = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--Neutral300" : "--Neutral600");

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

  const colorDeleteIconWarning = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--BaseWhite" : "--Neutral950");

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

  const checkUnchangedNote = async (): Promise<Notes> => {
    return await fetchData<Notes>("http://localhost:5000/notes/" + note.id);
  };
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
      <div className="noteTopMenuMobile">
        <button className="back-button">
          <ArrowLeft size={18} color={colorIcons}></ArrowLeft>Go Back
        </button>
        <div className="right">
          {showErase && (
            <button
              className="erase"
              onClick={() => (
                setShowDeleteMsg(true),
                setDeleteTitle("Delete Note"),
                setTextDelete(
                  "Are you sure you want to permanently delete this note? This action cannot be undone."
                ),
                setImgComponentDelete(
                  <IconDelete
                    width={24}
                    height={25}
                    color={colorDeleteIconWarning}
                  />
                ),
                setCancelBtn(
                  <button
                    className="cancel"
                    onClick={() => setShowDeleteMsg(false)}
                  >
                    Cancel
                  </button>
                ),
                setDeleteBtn(
                  <button className="delete" onClick={() => deleteNote()}>
                    Delete Note
                  </button>
                )
              )}
            >
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

          <button
            className="cancel"
            onClick={async () => {
              const unchangedNote: Notes = await checkUnchangedNote();
              console.log(unchangedNote.tags, note.tags);
              if (
                unchangedNote.heading !== note.heading ||
                // JSON.stringify(unchangedNote.tags) !==
                //   JSON.stringify(note.tags) ||
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
