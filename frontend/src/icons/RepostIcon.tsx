import React from "react";

type RepostIconProps = {
  size: number;
  color: string;
  onClick?: (e: any) => void;
};

const RepostIcon: React.FC<RepostIconProps> = ({ size, color, onClick }) => {
  return (
    <svg
      width={size}
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M4 8L3.29289 7.29289L2.58579 8L3.29289 8.70711L4 8ZM19 10C19 10.5523 19.4477 11 20 11C20.5523 11 21 10.5523 21 10H19ZM7.29289 3.29289L3.29289 7.29289L4.70711 8.70711L8.70711 4.70711L7.29289 3.29289ZM3.29289 8.70711L7.29289 12.7071L8.70711 11.2929L4.70711 7.29289L3.29289 8.70711ZM4 9H18V7H4V9ZM18 9C18.5523 9 19 9.44772 19 10H21C21 8.34315 19.6569 7 18 7V9Z"
        fill={color}
      />
      <path
        d="M20 16L20.7071 15.2929L21.4142 16L20.7071 16.7071L20 16ZM5 16L5 17L5 17L5 16ZM2 14C2 13.4477 2.44772 13 3 13C3.55228 13 4 13.4477 4 14L2 14ZM16.7071 11.2929L20.7071 15.2929L19.2929 16.7071L15.2929 12.7071L16.7071 11.2929ZM20.7071 16.7071L16.7071 20.7071L15.2929 19.2929L19.2929 15.2929L20.7071 16.7071ZM20 17L5 17L5 15L20 15L20 17ZM5 17C3.34315 17 2 15.6569 2 14L4 14C4 14.5523 4.44772 15 5 15L5 17Z"
        fill={color}
      />
    </svg>
  );
};

export default RepostIcon;
