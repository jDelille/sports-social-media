import React from "react";

type MenuDotsIconProps = {
  size: number;
  color: string;
};

const MenuDotsIcon: React.FC<MenuDotsIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="1"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <circle
        cx="6"
        cy="12"
        r="1"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <circle
        cx="18"
        cy="12"
        r="1"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default MenuDotsIcon;
