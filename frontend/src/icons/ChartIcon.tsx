import React from "react";

type ChartIconProps = {
  size: number;
  color: string;
};

const ChartIcon: React.FC<ChartIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 9L13.9558 13.5662C13.5299 14.2051 12.5728 14.1455 12.2294 13.4587L11.7706 12.5413C11.4272 11.8545 10.4701 11.7949 10.0442 12.4338L7 17"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke={color}
        stroke-width="2"
      />
    </svg>
  );
};

export default ChartIcon;
