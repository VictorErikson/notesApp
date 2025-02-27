import PageDesktopHeader from "../../components/pageHeader/PageDesktopHeader";
import Sidebar from "../../components/SettingsMenu/SettingsMenu";
import ChangeModeBtn from "../../components/ChangeModeBtn/ChangeModeBtn";
import { Notes } from "../../../public/api/types.ts";

// interface NewNoteDesktopProps {
//   note: { heading: string; tags: []; text: string };
//   setNote: (note: { heading: string; tags: []; text: string }) => void;
// }
interface NewNoteDesktopProps {
  note: Notes;
  setNote: (note: Notes) => void;
}

const NewNoteDesktop = ({ note, setNote }: NewNoteDesktopProps) => {
  return (
    <>
      <main className="home">
        <Sidebar />
        <PageDesktopHeader page={"All Notes"} />
      </main>
      <ChangeModeBtn />
    </>
  );
};

export default NewNoteDesktop;
