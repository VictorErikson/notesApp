import { useMode } from "../../../context/ModeContext.tsx";
import { useState } from "react";
import React from "react";
import "./_MenuBarMobile.scss";
import IconHome from "../../Images/icon-home";
import IconSearch from "../../Images/icon-search.tsx";
import IconSettings from "../../Images/icon-settings.tsx";
import IconArchive from "../../Images/icon-archive.tsx";
import IconTag from "../../Images/icon-tag.tsx";

const size: number = 24;

const buttons = [
  { id: "Home", icon: <IconHome size={size} /> },
  { id: "Search", icon: <IconSearch size={size} /> },
  { id: "Archived", icon: <IconArchive size={size} /> },
  { id: "Tags", icon: <IconTag size={size} /> },
  { id: "Settings", icon: <IconSettings size={size} /> },
];

const MenuBarMobile = () => {
  const { mode } = useMode();
  const [activeButton, setActiveButton] = useState<string>("Home");

  const getButtonColor = (id: string) => {
    return activeButton === id
      ? getComputedStyle(document.documentElement)
          .getPropertyValue("--Blue500")
          .trim()
      : getComputedStyle(document.documentElement)
          .getPropertyValue(mode === "dark" ? "--Neutral400" : "--Neutral600")
          .trim();
  };

  const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue(mode === "dark" ? "--Neutral800" : "--Neutral200")
    .trim();

  return (
    <nav
      style={{ borderTop: `1px solid ${borderColor}` }}
      className="mobile_menu"
    >
      {buttons.map(({ id, icon }) => (
        <>
          <button
            key={id}
            className={activeButton === id ? "active" : ""}
            onClick={() => setActiveButton(id)}
          >
            {React.cloneElement(icon, { color: getButtonColor(id) })}
            <p style={{ color: getButtonColor(id) }}>{id}</p>
          </button>
          <hr></hr>
        </>
      ))}
    </nav>
  );
};

export default MenuBarMobile;
