import "./_WarningMsg.scss";

interface WarningMsgProps {
  title: string;
  text: string;
  imgComponent: React.ReactNode;
  Btn1: React.ReactNode;
}

const WarningMsg: React.FC<WarningMsgProps> = ({
  title,
  text,
  imgComponent: ImgComponent,
  Btn1,
}) => {
  return (
    <div className="WarningMsg">
      <div className="top">
        <div className="icon">{ImgComponent}</div>
        <div className="textCont">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
      <div className="bottom">{Btn1}</div>
    </div>
  );
};

export default WarningMsg;
