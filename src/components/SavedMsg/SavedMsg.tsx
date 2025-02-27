import "./_SavedMsg.scss";
import Checkmark from "../Images/icon-checkmark";
import Cross from "../Images/icon-cross";
import { useEffect, useState } from "react";

interface SavedMsgProps {
  text: string;
  onClose: () => void; // Add this prop to handle closing
}

const SavedMsg: React.FC<SavedMsgProps> = ({ text, onClose }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    const removeTimeout = setTimeout(() => {
      onClose(); // Hide message after 3s automatically
    }, 3000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, [onClose]);

  return (
    <div className={`savedMsg ${isFading ? "fade-out" : ""}`}>
      <div className="text">
        <Checkmark size={16} color={"green"} />
        <p>{text}</p>
      </div>
      {/* Close button to hide the message manually */}
      <button className="close-btn" onClick={onClose}>
        <Cross size={16} color={"gray"} />
      </button>
    </div>
  );
};

export default SavedMsg;

//Trying to not make saved-msg dissapear when hovering
// import "./_SavedMsg.scss";
// import Checkmark from "../Images/icon-checkmark";
// import Cross from "../Images/icon-cross";
// import { useEffect, useState, useRef } from "react";

// interface SavedMsgProps {
//   text: string;
//   onClose: () => void;
//   onMouseEnter?: () => void;
//   onMouseLeave?: () => void;
// }

// const SavedMsg: React.FC<SavedMsgProps> = ({
//   text,
//   onClose,
//   onMouseEnter,
//   onMouseLeave,
// }) => {
//   const [isFading, setIsFading] = useState(false);
//   const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const removeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   //   useEffect(() => {
//   //     const fadeTimeout = setTimeout(() => {
//   //       setIsFading(true);
//   //     }, 2000);

//   //     const removeTimeout = setTimeout(() => {
//   //       onClose();
//   //     }, 3000);

//   //     return () => {
//   //       clearTimeout(fadeTimeout);
//   //       clearTimeout(removeTimeout);
//   //     };
//   //   }, []);
//   const startFadeOut = () => {
//     clearTimeout(fadeTimeoutRef.current!);
//     clearTimeout(removeTimeoutRef.current!);

//     fadeTimeoutRef.current = setTimeout(() => {
//       setIsFading(true);
//     }, 2000);

//     removeTimeoutRef.current = setTimeout(() => {
//       onClose();
//     }, 3000);
//   };

//   useEffect(() => {
//     startFadeOut();

//     return () => {
//       clearTimeout(fadeTimeoutRef.current!);
//       clearTimeout(removeTimeoutRef.current!);
//     };
//   }, []);

//   //   const pauseFadeOut = () => {
//   //     clearTimeout(fadeTimeoutRef.current!);
//   //     clearTimeout(removeTimeoutRef.current!);
//   //     setIsFading(false);
//   //   };

//   //   const resumeFadeOut = () => {
//   //     startFadeOut();
//   //   };

//   const greenColor = getComputedStyle(document.documentElement)
//     .getPropertyValue("--Green500")
//     .trim();
//   const neutralColor = getComputedStyle(document.documentElement)
//     .getPropertyValue("--Neutral400")
//     .trim();

//   return (
//     <div
//       className={`savedMsg ${isFading ? "fade-out" : ""}`}
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       <div className="text">
//         <Checkmark size={16} color={greenColor} />
//         <p>{text}</p>
//       </div>
//       <button onClick={onClose}>
//         <Cross size={16} color={neutralColor} />
//       </button>
//     </div>
//   );
// };

// export default SavedMsg;
