import "./PageDesktopHeader";
import Logo from "../Logo/Logo";
import { useMode } from "../../context/ModeContext.tsx";

const PageHeaderMobile = () => {
  const { mode } = useMode();
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    mode === "dark" ? "--Neutral800" : "--Neutral100"
  );

  return (
    <header style={{ background: color }} className="mobile-header">
      <Logo />
    </header>
  );
};

export default PageHeaderMobile;
