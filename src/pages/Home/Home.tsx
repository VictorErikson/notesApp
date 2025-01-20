import { useEffect, useState } from "react";
import HomeDesktop from "./HomeDesktop";
import HomeTabletMobile from "./HomeTabletMobile";

const Home = () => {
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTablet ? <HomeTabletMobile /> : <HomeDesktop />;
};

export default Home;
