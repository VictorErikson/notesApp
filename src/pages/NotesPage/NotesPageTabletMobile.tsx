import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoteTopMenuMobile from "../../components/NoteTopMenuMobile/NoteTopMenuMobile";
import Note from "../../components/Note/Note.tsx";
import fetchData from "../../services/fetchData.tsx";
import { Notes } from "../../../public/api/types.ts";
import SavedMsg from "../../components/SavedMsg/SavedMsg.tsx";
import LoadingMsg from "../../components/LoadingMsg/LoadingMsg.tsx";

interface NoteProps {
  noteId?: string;
  note: Notes | null;
  setNote: (note: Notes) => void;
}

const NotesPageTabletMobile = ({ noteId, note, setNote }: NoteProps) => {
  const [loading, setLoading] = useState(true);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadNote = async () => {
      try {
        const fetchedNote = await fetchData<Notes>(
          `https://notesdb-a0dv.onrender.com/notes/${noteId}`
        );
        setNote(fetchedNote);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    if (noteId) {
      loadNote();
    }
  }, [noteId]);

  useEffect(() => {
    if (location.state?.showSavedMsg) {
      setShowSavedMsg(true);
      setTimeout(() => setShowSavedMsg(false), 3000);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  if (loading) {
    return (
      <LoadingMsg
        msg={"Loading note. This may take a minute."}
        loadingSymbol={true}
      />
    );
  }

  if (!note) {
    return <LoadingMsg msg={"Error: Note not found"} loadingSymbol={false} />;
  }

  return (
    <main className="mainHomeTablet">
      <div className="notesBackground">
        <div className="newNote">
          <NoteTopMenuMobile
            note={note}
            create={false}
            showErase={true}
            showArchive={true}
            showRestore={false}
            setShowSavedMsg={setShowSavedMsg}
          />
          <Note setNote={setNote} note={note} />
        </div>
      </div>

      {showSavedMsg && (
        <SavedMsg
          text="Note saved successfully!"
          onClose={() => setShowSavedMsg(false)}
        />
      )}
    </main>
  );
};

export default NotesPageTabletMobile;

// trying to implement so save-msg doesnt dissapear when hovering
// import { useEffect, useState, useRef } from "react";
// import MenuBarMobile from "../../components/Mobile/MenuBarMobile/MenuBarMobile";
// import PageHeaderMobile from "../../components/pageHeader/PageHeaderMobile";
// import NoteTopMenuMobile from "../../components/NoteTopMenuMobile/NoteTopMenuMobile";
// import Note from "../../components/Note/Note.tsx";
// import fetchData from "../../services/fetchData.tsx";
// import { Notes } from "../../../public/api/types.ts";
// import SavedMsg from "../../components/SavedMsg/Savedmsg.tsx";
// import { useLocation } from "react-router-dom";

// interface NoteProps {
//   noteId: string;
//   setNote: (note: Notes) => void;
//   note: Notes;
// }

// const NotesPageTabletMobile = ({ noteId, setNote, note }: NoteProps) => {
//   const [loading, setLoading] = useState(true);
//   const [showSavedMsg, setShowSavedMsg] = useState(false);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const location = useLocation();

//   useEffect(() => {
//     const loadNote = async () => {
//       try {
//         const fetchedNote = await fetchData<Notes>(
//           `https://notesdb-a0dv.onrender.com/notes/${noteId}`
//         );
//         setNote(fetchedNote);
//       } catch (error) {
//         console.error("Error fetching note:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (noteId) {
//       loadNote();
//     }
//   }, [noteId]);

//   useEffect(() => {
//     if (location.state?.showSavedMsg) {
//       setShowSavedMsg(true);

//       clearTimeout(timeoutRef.current!);
//       timeoutRef.current = setTimeout(() => setShowSavedMsg(false), 3000);
//     }
//   }, [location.state]);

//   const pauseFadeOut = () => {
//     clearTimeout(timeoutRef.current!);
//   };

//   const resumeFadeOut = () => {
//     timeoutRef.current = setTimeout(() => setShowSavedMsg(false), 3000);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!note) {
//     return <div>Error: Note not found</div>;
//   }
//   return (
//     <main className="mainHomeTablet">
//       <PageHeaderMobile />
//       <div className="notesBackground">
//         <div className="newNote">
//           <NoteTopMenuMobile
//             note={note}
//             create={false}
//             showErase={true}
//             showArchive={true}
//             showRestore={false}
//             setShowSavedMsg={setShowSavedMsg}
//           />
//           <Note setNote={setNote} note={note} />
//         </div>
//       </div>
//       {showSavedMsg && (
//         <SavedMsg
//           text="Note saved successfully!"
//           onClose={() => setShowSavedMsg(false)}
//           onMouseEnter={pauseFadeOut}
//           onMouseLeave={resumeFadeOut}
//         />
//       )}
//       <MenuBarMobile />
//     </main>
//   );
// };

// export default NotesPageTabletMobile;
