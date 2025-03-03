type IconProps = {
  color?: string;
  size?: number;
};

const Iconinfo: React.FC<IconProps> = ({ color = "#FF0000", size = 20 }) => {
  return (
    <svg
      className="iconInfo"
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
        d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12.006 15.693v-4.3M12 8.355v-.063"
      />
    </svg>
  );
};

export default Iconinfo;
