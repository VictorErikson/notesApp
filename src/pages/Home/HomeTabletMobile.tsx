import AllNotesMobile from "../../components/allNotes/AllNotesMobile";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SavedMsg from "../../components/SavedMsg/SavedMsg";

const HomeTabletMobile = () => {
  const [showDeletedMsg, setShowDeletedMsg] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.showDeletedMsg) {
      setShowDeletedMsg(true);
      setTimeout(() => setShowDeletedMsg(false), 3000);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <main className="mainHomeTablet">
      <AllNotesMobile />
      {showDeletedMsg && (
        <SavedMsg
          text="Note permanently deleted."
          onClose={() => setShowDeletedMsg(false)}
        />
      )}
    </main>
  );
};

export default HomeTabletMobile;
