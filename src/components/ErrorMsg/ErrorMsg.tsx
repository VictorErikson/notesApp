import "./_ErrorMsg.scss";
import { useMode } from "../../context/ModeContext.tsx";

type IconProps = {
  color?: string;
  width?: number;
  height?: number;
};

interface ErrorMsgProps {
  title: string;
  text: string;
  imgComponent: React.FC<IconProps>;
  btn1: string;
  btn2: string;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({
  title,
  text,
  imgComponent: ImgComponent,
  btn1,
  btn2,
}) => {
  const { mode } = useMode();

  const colorIcons = getComputedStyle(
    document.documentElement
  ).getPropertyValue(mode === "dark" ? "--Neutral950" : "--BaseWhite");

  return (
    <>
      <div className="top">
        <ImgComponent width={24} height={25} color={colorIcons} />
        <div className="textCont">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
      <div className="bottom">
        <button>{btn1}</button>
        <button>{btn2}</button>
      </div>
    </>
  );
};

export default ErrorMsg;
