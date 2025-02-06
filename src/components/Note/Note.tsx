import { useState, useEffect } from "react";
import IconClock from "../Images/icon-clock";
import IconTag from "../Images/icon-tag";
import { useMode } from "../../context/ModeContext.tsx";
import { Notes } from "../../../public/api/types.ts";

import "./_Note.scss";

interface NoteProps {
  setNote: (note: Notes) => void;
  note: Notes;
}

const Note = ({ setNote, note }: NoteProps) => {
  const { mode } = useMode();
  const colorIcons = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--Neutral300" : "--Neutral700");

  const [editableNote, setEditableNote] = useState<Notes>(note);

  useEffect(() => {
    setNote(editableNote);
  }, [editableNote, setNote]);

  //   const handleInputChange = (e: React.FormEvent<HTMLParagraphElement>) => {
  //     const { id, innerText } = e.currentTarget;
  //     setEditableNote((prev: Notes) => ({ ...prev, [id]: innerText }));
  //   };

  //placeholders fot the contentEditable elements

  //   useEffect(() => {
  //     const contentEditables = document.querySelectorAll(
  //       '[contentEditable="true"]'
  //     );

  //     contentEditables.forEach((element) => {
  //       const el = element as HTMLElement;
  //       const placeholderText = el.getAttribute("data-placeholder") || "";

  //       const checkPlaceholder = () => {
  //         if (el.innerText.trim() === "") {
  //           el.innerText = placeholderText;
  //           el.classList.add("placeholder");
  //         }
  //       };

  //       el.addEventListener("focus", () => {
  //         if (el.innerText === placeholderText) {
  //           el.innerText = "";
  //           el.classList.remove("placeholder");
  //         }
  //       });

  //       el.addEventListener("blur", checkPlaceholder);

  //       checkPlaceholder();
  //     });

  //     return () => {
  //       contentEditables.forEach((element) => {
  //         const el = element as HTMLElement;
  //         el.removeEventListener("focus", () => {});
  //         el.removeEventListener("blur", () => {});
  //       });
  //     };
  //   }, []);

  //   //   Capture changes and updates state
  //   useEffect(() => {
  //     const updateNoteState = () => {
  //       const heading =
  //         (document.getElementById("heading") as HTMLElement)?.innerText || "";
  //       const tags =
  //         (document.getElementById("tags") as HTMLElement)?.innerText || "";
  //       const text =
  //         (document.getElementById("text") as HTMLElement)?.innerText || "";

  //       setNote({ title: heading, tags, text });
  //     };

  //     document
  //       .getElementById("heading")
  //       ?.addEventListener("input", updateNoteState);
  //     document.getElementById("tags")?.addEventListener("input", updateNoteState);
  //     document.getElementById("text")?.addEventListener("input", updateNoteState);

  //     return () => {
  //       document
  //         .getElementById("heading")
  //         ?.removeEventListener("input", updateNoteState);
  //       document
  //         .getElementById("tags")
  //         ?.removeEventListener("input", updateNoteState);
  //       document
  //         .getElementById("text")
  //         ?.removeEventListener("input", updateNoteState);
  //     };
  //   }, [setNote]);

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

// import { useState } from "react";
// import { Notes } from "../../../public/api/types";

// interface NoteProps {
//   note: Notes;               // The existing note data from your fetch
//   setNote: (note: Notes) => void; // Update parent state if needed
// }

// export default function Note({ note, setNote }: NoteProps) {
//   // Keep a local copy of the note’s data for editing
//   const [editableNote, setEditableNote] = useState<Notes>(note);

//   const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEditableNote((prev) => ({
//       ...prev,
//       heading: e.target.value,
//     }));
//   };

//   const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // For comma-separated tags
//     const newTags = e.target.value.split(",").map((t) => t.trim());
//     setEditableNote((prev) => ({
//       ...prev,
//       tags: newTags,
//     }));
//   };

//   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setEditableNote((prev) => ({
//       ...prev,
//       text: e.target.value, // preserves line breaks as \n
//     }));
//   };

//   // Example: you might auto-update lastEdited upon changes
//   // or let the server handle it on save:
//   // e.g., setEditableNote(..., lastEdited: new Date().toISOString())

//   // When the user clicks “Save,” do a PATCH or PUT
//   const handleSave = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/notes/${editableNote.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editableNote),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update note");
//       }

//       // Update parent if needed
//       setNote(editableNote);
//       alert("Note updated successfully!");
//     } catch (err) {
//       console.error("Error updating note:", err);
//       alert("Failed to save note.");
//     }
//   };

//   return (
//     <div>
//       <label>
//         Heading:
//         <input
//           type="text"
//           value={editableNote.heading}
//           onChange={handleHeadingChange}
//         />
//       </label>

//       <label>
//         Tags (comma-separated):
//         <input
//           type="text"
//           value={editableNote.tags.join(", ")}
//           onChange={handleTagsChange}
//         />
//       </label>

//       <div>
//         <strong>Last Edited:</strong> {editableNote.lastEdited}
//       </div>

//       <label>
//         Note Text (multiline):
//         <textarea
//           value={editableNote.text}
//           onChange={handleTextChange}
//           rows={8}
//           cols={40}
//         />
//       </label>

//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// }
