import PageDesktopHeader from "../../components/pageHeader/PageDesktopHeader";
import Sidebar from "../../components/SettingsMenu/SettingsMenu";
import ChangeModeBtn from "../../components/ChangeModeBtn/ChangeModeBtn";

const NewNoteDesktop = () => {
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
