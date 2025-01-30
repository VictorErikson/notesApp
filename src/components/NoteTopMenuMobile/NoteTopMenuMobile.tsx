import IconArchive from "../Images/icon-archive";
import ArrowLeft from "../Images/icon-arrow-left";
import IconDelete from "../Images/icon-delete";
import { useMode } from "../../context/ModeContext.tsx";
import "./_NoteTopMenuMobile.scss";

const NoteTopMenuMobile: React.FC<{
  showErase?: boolean;
  showArchive?: boolean;
  showRestore?: boolean;
}> = ({ showErase, showArchive }) => {
  const { mode } = useMode();
  const colorIcons = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--Neutral300" : "--Neutral600");

  return (
    <>
      <div className="noteTopMenuMobile">
        <button className="back-button">
          <ArrowLeft size={18} color={colorIcons}></ArrowLeft>Go Back
        </button>
        <div className="right">
          {showErase && (
            <button className="erase">
              <IconDelete
                width={18}
                height={18}
                color={colorIcons}
              ></IconDelete>
            </button>
          )}
          {showArchive && (
            <button className="archive">
              <IconArchive size={18} color={colorIcons}></IconArchive>
            </button>
          )}

          <button className="cancel">Cancel</button>
          <button className="save">Save Note</button>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default NoteTopMenuMobile;
