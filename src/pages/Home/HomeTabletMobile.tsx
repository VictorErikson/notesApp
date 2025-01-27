import MenuBarMobile from "../../components/Mobile/MenuBarMobile/MenuBarMobile";
import PageHeaderMobile from "../../components/pageHeader/PageHeaderMobile";
import ChangeModeBtn from "../../components/ChangeModeBtn/ChangeModeBtn";
import AllNotesMobile from "../../components/allNotes/AllNotesMobile";

const HomeTabletMobile = () => {
  return (
    <main className="mainHomeTablet">
      <PageHeaderMobile />
      <AllNotesMobile />
      <MenuBarMobile />
      {/* <ChangeModeBtn /> */}
    </main>
  );
};

export default HomeTabletMobile;
