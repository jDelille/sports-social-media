import React from "react";

type CheckMarkIconProps = {
  size: number;
  color: string;
};

const CheckMarkIcon: React.FC<CheckMarkIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 14L9 17L18 6" stroke={color} stroke-width="2" />
    </svg>
  );
};

export default CheckMarkIcon;
