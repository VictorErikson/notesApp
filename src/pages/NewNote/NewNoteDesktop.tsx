import PageDesktopHeader from "../../components/pageHeader/PageDesktopHeader";
import Sidebar from "../../components/SettingsMenu/SettingsMenu";
import ChangeModeBtn from "../../components/ChangeModeBtn/ChangeModeBtn";

interface NewNoteDesktopProps {
  note: { title: string; tags: string; text: string };
  setNote: (note: { title: string; tags: string; text: string }) => void;
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
