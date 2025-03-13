import { useMode } from "../../../context/ModeContext";
import IconArchive from "../../Images/icon-archive";
import IconDelete from "../../Images/icon-delete";
import "./_arciveDeleteMenu.scss";

const ArchiveDeleteMenu = () => {
  const { mode } = useMode();

  const iconColor = getComputedStyle(document.documentElement)
    .getPropertyValue(mode === "dark" ? "--BaseWhite" : "--BaseBlack")
    .trim();

  return (
    <div className="ArciveDeleteMenu">
      <button className="archive">
        <IconArchive size={20} color={iconColor} />
        <p>Archive Note</p>
      </button>
      <button className="delete">
        <IconDelete width={20} height={21} color={iconColor} />
        <p>Delete Note</p>
      </button>
    </div>
  );
};

export default ArchiveDeleteMenu;
