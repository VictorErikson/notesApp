import { Notes } from "../../../public/api/types.ts";

interface NoteProps {
  noteId?: string;
  note: Notes | null;
  setNote: (note: Notes) => void;
}

const NotesPageDesktop = ({ noteId, note, setNote }: NoteProps) => {
  return <></>;
};

export default NotesPageDesktop;
