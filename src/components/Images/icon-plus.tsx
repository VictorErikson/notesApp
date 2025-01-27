type IconProps = {
  color?: string;
  size?: number;
};

const IconPlus: React.FC<IconProps> = ({ color = "#0000", size = 24 }) => {
  return (
    <svg
      className="IconPlus"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M12 5a.75.75 0 0 1 .75.75V11H18a.75.75 0 0 1 0 1.5h-5.25v5.25a.75.75 0 0 1-1.5 0V12.5H6A.75.75 0 0 1 6 11h5.25V5.75A.75.75 0 0 1 12 5Z"
      />
    </svg>
  );
};

export default IconPlus;
