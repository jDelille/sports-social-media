import React from "react";

type ChervonDownIconProps = {
  size: number;
  color: string;
};

const ChervonDownIcon: React.FC<ChervonDownIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ChervonDownIcon;
