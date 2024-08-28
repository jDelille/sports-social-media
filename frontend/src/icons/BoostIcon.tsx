import React from "react";

type BoostIconProps = {
  size: number;
  color: string;
};

const BoostIcon: React.FC<BoostIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15"
        cy="12"
        r="6"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 9L18 12M15 15L18 12M18 12H12"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.5 8L7 8"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M10.5 16L7 16"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M9 12L3 12"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default BoostIcon;
