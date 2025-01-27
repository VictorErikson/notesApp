import { useMode } from "../../context/ModeContext.tsx";
import { useState } from "react";
import "./_SettingsMenu.scss";
import IconHome from "../Images/icon-home.tsx";
import Tag from "../Images/icon-tag.tsx";
import IconArchived from "../Images/icon-archive.tsx";
import ChevronRight from "../Images/icon-chevron-right.tsx";
// import IconTag from "../Images/icon-tag.tsx";
import Logo from "../Logo/Logo.tsx";

const size: number = 20;

const tags = [
  "Cooking",
  "dev",
  "fitness",
  "health",
  "personal",
  "react",
  "shopping",
  "travel",
  "typeScript",
];

const Sidebar = () => {
  const { mode } = useMode();
  const [activeButton, setActiveButton] = useState<string>("Home");

  const getButtonColor = (id: string) => {
    return activeButton === id
      ? getComputedStyle(document.documentElement)
          .getPropertyValue(mode === "dark" ? "--Neutral800" : "--Neutral100")
          .trim()
      : "none";
  };
  const getIconColor = (id: string) => {
    return activeButton === id
      ? getComputedStyle(document.documentElement)
          .getPropertyValue("--Blue500")
          .trim()
      : getComputedStyle(document.documentElement)
          .getPropertyValue(mode === "dark" ? "--Neutral200" : "--Neutral700")
          .trim();
  };
  const getTextColor = (id: string) => {
    return activeButton === id
      ? getComputedStyle(document.documentElement)
          .getPropertyValue(mode === "dark" ? "--BaseWhite" : "--Neutral950")
          .trim()
      : getComputedStyle(document.documentElement)
          .getPropertyValue(mode === "dark" ? "--Neutral200" : "--Neutral700")
          .trim();
  };
  const getChevronColor = (id: string) => {
    return activeButton === id
      ? getComputedStyle(document.documentElement)
          .getPropertyValue(mode === "dark" ? "--BaseWhite" : "--Neutral950")
          .trim()
      : "none";
  };

  //
  // const useColor = mode === "dark" ? "#FFFFFF" : "#0E121B";

  return (
    <aside className="sidebar">
      <Logo />
      <div className="content">
        <div className="top">
          <button
            id="Home"
            className={activeButton === "Home" ? "active" : ""}
            onClick={() => setActiveButton("Home")}
            style={{ background: getButtonColor("Home") }}
          >
            <div>
              <IconHome size={size} color={getIconColor("Home")} />
              <h2 style={{ color: getTextColor("Home") }}>All Notes</h2>
            </div>
            <ChevronRight color={getChevronColor("Home")} />
          </button>
          <button
            id="Archived"
            className={activeButton === "Archived" ? "active" : ""}
            onClick={() => setActiveButton("Archived")}
            style={{ background: getButtonColor("Archived") }}
          >
            <div>
              <IconArchived size={size} color={getIconColor("Archived")} />
              <h2 style={{ color: getTextColor("Archived") }}>
                Archived Notes
              </h2>
            </div>
            <ChevronRight color={getChevronColor("Archived")} />
          </button>
        </div>
        <hr></hr>
        <h2 className="tagsHeading">Tags</h2>
        <div className="tags">
          {tags.map((tag) => (
            <button
              key={tag}
              id={tag}
              className={activeButton === tag ? "active" : ""}
              onClick={() => setActiveButton(tag)}
              style={{ background: getButtonColor(tag) }}
            >
              <div>
                <Tag size={size} color={getIconColor(tag)} />
                <h3 style={{ color: getTextColor(tag) }}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </h3>
              </div>
              <ChevronRight color={getChevronColor(tag)} />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
