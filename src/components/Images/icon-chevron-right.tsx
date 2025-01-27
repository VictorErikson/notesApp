type IconProps = {
  color?: string;
  size?: number;
};

const ChevronRight: React.FC<IconProps> = ({
  color = "#FF0000",
  size = 24,
}) => {
  return (
    <svg
      className="ChevronRight"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M9.47 7.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06L12.94 12 9.47 8.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ChevronRight;
