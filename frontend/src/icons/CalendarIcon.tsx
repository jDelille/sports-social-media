import React from "react";

type CalendarIconProps = {
  size: number;
  color: string;
};

const CalendarIcon: React.FC<CalendarIconProps> = ({ size}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="6"
        width="18"
        height="15"
        rx="2"
        stroke="#33363F"
        strokeWidth="2"
      />
      <path
        d="M4 11H20"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 16H15"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 3L8 7"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 3L16 7"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CalendarIcon;
