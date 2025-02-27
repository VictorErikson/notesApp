import { useEffect, useState } from "react";
import NewNoteTabletMobile from "./NewNoteTabletMobile";
import NewNoteDesktop from "./NewNoteDesktop";
import "./_newNote.scss";
import { Notes } from "../../../public/api/types.ts";

// interface Note {
//   heading: string;
//   tags: string;
//   text: string;
// }

const NewNote = () => {
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);
  const [note, setNote] = useState<Notes>({ heading: "", tags: [], text: "" });

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTablet ? (
    <NewNoteTabletMobile note={note} setNote={setNote} />
  ) : (
    <NewNoteDesktop note={note} setNote={setNote} />
  );
};

export default NewNote;
