// import { ReactComponent as SearchSvg } from "../../assets/images/icon-search.svg";

// type IconProps = {
//   color?: string;
//   size?: number;
// };

// const IconSearch: React.FC<IconProps> = ({ color = "#000", size = 24 }) => {
//   return <SearchSvg width={size} height={size} fill={color} />;
// };

// export default IconSearch;

type IconProps = {
  color?: string;
  size?: number;
};

const IconSearch: React.FC<IconProps> = ({ color = "#FF0000", size = 20 }) => {
  return (
    <svg
      className="IconSearch"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M11.248 3.5a7.289 7.289 0 1 0 0 14.577 7.289 7.289 0 0 0 0-14.577ZM2.46 10.79a8.789 8.789 0 1 1 17.577 0 8.789 8.789 0 0 1-17.577 0Z"
        clipRule="evenodd"
      />
      <path
        fill={color}
        fillRule="evenodd"
        d="m16.736 15.648 5.616 5.6-1.06 1.063-5.615-5.601 1.06-1.062Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default IconSearch;
