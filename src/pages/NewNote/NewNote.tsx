import { useEffect, useState } from "react";
import NewNoteTabletMobile from "./NewNoteTabletMobile";
import NewNoteDesktop from "./NewNoteDesktop";
import "./_newNote.scss";

const NewNote = () => {
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTablet ? <NewNoteTabletMobile /> : <NewNoteDesktop />;
};

export default NewNote;
