import React from "react";

type WorldIconProps = {
  size: number;
  color: string;
};

const WorldIcon: React.FC<WorldIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="8" stroke={color} stroke-width="2" />
      <ellipse cx="12" cy="12" rx="3" ry="8" stroke={color} stroke-width="2" />
      <path
        d="M4 12H20"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default WorldIcon;
