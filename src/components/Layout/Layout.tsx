import { useEffect, useState } from "react";
import PageHeaderMobile from "../pageHeader/PageHeaderMobile";
import MenuBarMobile from "../Mobile/MenuBarMobile/MenuBarMobile";
import { Outlet } from "react-router-dom";
import Sidebar from "../SettingsMenu/SettingsMenu";
import PageDesktopHeader from "../pageHeader/PageDesktopHeader";
import AllNotesDesktop from "../../components/allNotes/AllNotesDesktop";

const Layout = () => {
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isTablet) {
    return (
      <>
        <PageHeaderMobile />
        <div className="mainContent">
          <Outlet />
        </div>
        <MenuBarMobile />
      </>
    );
  } else {
    return (
      <div className="homeDesktop">
        <Sidebar />
        <main className="mainHomeDesktop">
          <PageDesktopHeader page={"All Notes"} />
          <div className="notesContainer">
            <AllNotesDesktop />
            <div className="mainContent">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export default Layout;
