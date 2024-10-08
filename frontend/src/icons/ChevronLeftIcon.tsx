import React from "react";

type ChevronLeftProps = {
  size: number;
  color: string;
};

const ChevronLeft: React.FC<ChevronLeftProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15 6L9 12L15 18" stroke={color} stroke-width="2" />
    </svg>
  );
};

export default ChevronLeft;
