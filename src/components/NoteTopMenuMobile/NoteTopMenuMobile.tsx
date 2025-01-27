import IconArchive from "../Images/icon-archive";
import ArrowLeft from "../Images/icon-arrow-left";
import IconDelete from "../Images/icon-delete";
import "./_NoteTopMenuMobile.scss";

const NoteTopMenuMobile: React.FC<{
  showErase?: boolean;
  showArchive?: boolean;
}> = ({ showErase, showArchive }) => {
  return (
    <>
      <div className="noteTopMenuMobile">
        <button className="back-button">
          <ArrowLeft size={18} color=""></ArrowLeft>Go Back
        </button>
        <div className="right">
          {showErase && (
            <button className="erase">
              <IconDelete></IconDelete>
            </button>
          )}
          {showArchive && (
            <button className="archive">
              <IconArchive></IconArchive>
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
