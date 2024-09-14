import React from "react";

type BlockIconProps = {
  size: number;
  color: string;
};

const BlockIcon: React.FC<BlockIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke={color} stroke-width="2" />
      <path d="M18 18L6 6" stroke={color} stroke-width="2" />
    </svg>
  );
};

export default BlockIcon;
