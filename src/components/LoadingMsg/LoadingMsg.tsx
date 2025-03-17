import { useState, useEffect, useRef } from "react";
import "./_loadingMsg.scss";

const LoadingMsg = ({
  msg,
  loadingSymbol,
}: {
  msg: string;
  loadingSymbol: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div>
      <div className="loadContainer">
        {loadingSymbol && <div className="loadingSym"></div>}
        <p className="loading">{msg}</p>
      </div>
    </div>
  );
};

export default LoadingMsg;
