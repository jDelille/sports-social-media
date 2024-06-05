import React from "react";

type MenuIconProps = {
  size: number;
  color: string;
};

const MenuIcon: React.FC<MenuIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="6"
        cy="12"
        r="1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="18"
        cy="12"
        r="1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default MenuIcon;
