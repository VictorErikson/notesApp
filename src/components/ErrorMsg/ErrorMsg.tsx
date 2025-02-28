import "./_ErrorMsg.scss";

interface ErrorMsgProps {
  title: string;
  text: string;
  imgComponent: React.ReactNode;
  Btn1: React.ReactNode;
  Btn2: React.ReactNode;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({
  title,
  text,
  imgComponent: ImgComponent,
  Btn1,
  Btn2,
}) => {
  return (
    <div className="ErrorMsg">
      <div className="top">
        <div className="icon">{ImgComponent}</div>
        <div className="textCont">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
      <div className="bottom">
        {Btn1}
        {Btn2}
      </div>
    </div>
  );
};

export default ErrorMsg;
