import { v4 as uuidv4 } from "uuid";
import { Notes } from "../../public/api/types.ts";

//Fix this alert
export const saveNote = async (note: Notes) => {
  if (
    // !note.tags.join(", ").trim() ||
    !note.tags.join(", ").trim() ||
    !note.text.trim() ||
    // note.tags.join(", ") ===
    //   "Add tags separated by commas (e.g. Work, Planning)"
    note.tags.includes("Add tags separated by commas (e.g. Work") ||
    note.text === "Start typing your note here..."
  ) {
    alert(
      "Cannot save an empty note. Make sure to add a title, text, and at least one valid tag."
    );
    return;
  }

  const updatedNote = {
    heading: note.heading,
    tags: note.tags,
    lastEdited: new Intl.DateTimeFormat("sv-SE").format(new Date()),
    text: note.text,
  };

  try {
    const response = await fetch("http://localhost:5000/notes/" + note.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });

    if (response.ok) {
      console.log("Note saved successfully!");
    } else {
      console.error("Failed to save note");
    }
  } catch (error) {
    console.error("Error saving note:", error);
  }
};
//Fix this alert
export const saveNoteFirstTime = async (
  note: Notes,
  user: string,
  navigate: (path: string, options?: { state?: any }) => void
) => {
  if (!note || !note.heading || !note.text || !note.tags) {
    alert(
      "Cannot save an empty note. Make sure to add a title, text, and at least one valid tag."
    );
    return;
  }

  if (
    !note.heading.trim() ||
    !note.text.trim() ||
    note.heading === "Type here..." ||
    note.text === "Start typing your note here..." ||
    note.tags.length === 0 ||
    note.tags.includes("Add tags separated by commas (e.g. Work")
  ) {
    alert("cannot save an empty note.");
    return;
  }

  const newNote = {
    id: uuidv4(),
    userId: user,
    heading: note.heading,
    tags: note.tags,
    lastEdited: new Intl.DateTimeFormat("sv-SE").format(new Date()),
    text: note.text,
  };

  try {
    const response = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    });

    if (response.ok) {
      navigate(`/notes/${newNote.id}`, { state: { showSavedMsg: true } });
    } else {
      console.error("Failed to save note");
    }
  } catch (error) {
    console.error("Error saving note:", error);
  }
};
