import { useEffect, useState } from "react";
import NotesPageDesktop from "./NotesPageDesktop";
import NotesPageTabletMobile from "./NotesPageTabletMobile";
import { useParams } from "react-router-dom";
import "./_notesPage.scss";
import { Notes } from "../../../public/api/types.ts";

const NotesPage = () => {
  //   const { noteId } = useParams<{ noteId: string }>();
  const { noteId } = useParams();
  const [note, setNote] = useState<Notes | null>(null);

  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTablet ? (
    <NotesPageTabletMobile noteId={noteId} setNote={setNote} note={note} />
  ) : (
    <NotesPageDesktop noteId={noteId} setNote={setNote} note={note} />
  );
};

export default NotesPage;
