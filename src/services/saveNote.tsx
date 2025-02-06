// const save = (
//   title: string,
//   insertTags: string,
//   insertText: string,
//   userId: number,
//   noteId: string
// ) => {
//   const heading = title;
//   const tags: string[] = insertTags.split(",").map((word) => word.trim());
//   const lastEdited = (): string => {
//     return new Intl.DateTimeFormat("sv-SE").format(new Date());
//   };
//   const text = insertText;
// };
import { v4 as uuidv4 } from "uuid";

interface NoteNew {
  title: string;
  tags: string;
  text: string;
}
interface Note {
  id: string;
  userId: string;
  heading: string;
  tags: string[];
  lastEdited: string;
  text: string;
}
<br></br>;
//Fix this alert
export const saveNote = async (note: Note) => {
  if (
    !note.tags.join(", ").trim() ||
    !note.text.trim() ||
    note.tags.join(", ") === "Type here..." ||
    note.text === "Start typing your note here..."
  ) {
    alert("cannot save an empty note.");
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
  note: NoteNew,
  user: string,
  navigate: (path: string) => void
) => {
  if (
    !note.title.trim() ||
    !note.text.trim() ||
    note.title === "Type here..." ||
    note.text === "Start typing your note here..."
  ) {
    alert("cannot save an empty note.");
    return;
  }

  const newNote = {
    id: uuidv4(),
    userId: user,
    heading: note.title,
    tags:
      note.tags === "Add tags separated by commas (e.g. Work, Planning)"
        ? []
        : note.tags.split(",").map((tag) => tag.trim()),
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
      console.log("Note saved successfully!");

      navigate(`/notes/${newNote.id}`);
    } else {
      console.error("Failed to save note");
    }
  } catch (error) {
    console.error("Error saving note:", error);
  }
};
