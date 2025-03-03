import { useState, useEffect } from "react";
import IconClock from "../Images/icon-clock";
import IconTag from "../Images/icon-tag";
import { useMode } from "../../context/ModeContext.tsx";
import { Notes } from "../../../public/api/types.ts";

import "./_Note.scss";

interface NoteProps {
  note: Notes;
  setNote: (note: Notes) => void;
}

const Note: React.FC<NoteProps> = ({ note, setNote }) => {
  const { mode } = useMode();
  const colorIcons = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--Neutral300" : "--Neutral700");

  const [editableNote, setEditableNote] = useState<Notes>(note);

  useEffect(() => {
    setNote(editableNote);
  }, [editableNote, setNote]);

  return (
    <div className="newNote-container">
      <h2
        id="heading"
        contentEditable="true"
        suppressContentEditableWarning
        onBlur={(e) => {
          const element = e.currentTarget;

          setTimeout(() => {
            setEditableNote((prev) => ({
              ...prev,
              heading: element.innerHTML,
            }));
          }, 0);
        }}
      >
        {editableNote.heading}
      </h2>
      <div className="tags">
        <div className="tagHeading">
          <IconTag color={colorIcons} size={16}></IconTag>
          <h3>Tags </h3>
        </div>
        <p
          id="tags"
          contentEditable="true"
          suppressContentEditableWarning
          onBlur={(e) => {
            const element = e.currentTarget;
            setTimeout(() => {
              setEditableNote((prev) => ({
                ...prev,
                tags: [element.innerHTML],
              }));
            }, 0);
          }}
        >
          {editableNote.tags.join(", ")}
        </p>
      </div>
      <div className="lastSaved">
        <div className="lastSavedHeading">
          <IconClock color={colorIcons} size={16}></IconClock>
          <h3>Last edited</h3>
        </div>
        <p id="lastSaved">{editableNote.lastEdited}</p>
      </div>
      <hr></hr>
      <p
        id="text"
        contentEditable="true"
        suppressContentEditableWarning
        onBlur={(e) => {
          const target = e.currentTarget;
          setTimeout(() => {
            setEditableNote((prev) => ({
              ...prev,
              text: target.innerHTML,
            }));
          }, 0);
        }}
        dangerouslySetInnerHTML={{ __html: editableNote.text }}
      />
    </div>
  );
};

export default Note;
