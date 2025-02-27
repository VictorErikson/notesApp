type IconProps = {
  color?: string;
  size?: number;
};

const Cross: React.FC<IconProps> = ({ color = "#FF0000", size = 24 }) => {
  return (
    <svg
      className="cross"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m6 6 12 12M18 6 6 18"
      />
    </svg>
  );
};

export default Cross;
