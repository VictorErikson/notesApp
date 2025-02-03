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

interface Note {
  title: string;
  tags: string;
  text: string;
}

//Fix this alert
const saveNote = async (
  note: Note,
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
    tags: note.tags.split(",").map((tag) => tag.trim()),
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

export default saveNote;
