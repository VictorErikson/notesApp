import "../pageHeader/_PageHeader.scss";
import IconSearch from "../Images/icon-search.tsx";
import IconSettings from "../Images/icon-settings.tsx";
import { useMode } from "../../context/ModeContext.tsx";

const PageDesktopHeader = ({ page }: { page: string }) => {
  const { mode } = useMode();
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    mode === "dark" ? "--Neutral400" : "--Neutral500"
  );
  // const useColor = mode === "dark" ? "#FFFFFF" : "#0E121B";

  return (
    <header className="desktop-header">
      <h2>{page}</h2>
      <div className="search">
        <div className="search-wrapper">
          <IconSearch color={color} size={20} />
          <input
            type="search"
            id="search"
            name="q"
            placeholder="Searchby title,content, or tags..."
          />
        </div>
        <button>
          <IconSettings color={color} size={24} />
        </button>
      </div>
    </header>
  );
};

export default PageDesktopHeader;
