import React from "react";

type TrophyIconProps = {
  size: number;
  color: string;
};

const TrophyIcon: React.FC<TrophyIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 20.5H7.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M13 18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5H13ZM11 18.5V16H13V18.5H11Z"
        fill={color}
      />
      <path
        d="M10.5 9.5H13.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M5.5 14.5C5.5 14.5 3.5 13 3.5 10.5C3.5 9.73465 3.5 9.06302 3.5 8.49945C3.5 7.39488 4.39543 6.5 5.5 6.5V6.5C6.60457 6.5 7.5 7.39543 7.5 8.5V9.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M18.5 14.5C18.5 14.5 20.5 13 20.5 10.5C20.5 9.73465 20.5 9.06302 20.5 8.49945C20.5 7.39488 19.6046 6.5 18.5 6.5V6.5C17.3954 6.5 16.5 7.39543 16.5 8.5V9.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M16.5 11.3593V7.5C16.5 6.39543 15.6046 5.5 14.5 5.5H9.5C8.39543 5.5 7.5 6.39543 7.5 7.5V11.3593C7.5 12.6967 8.16841 13.9456 9.2812 14.6875L11.4453 16.1302C11.7812 16.3541 12.2188 16.3541 12.5547 16.1302L14.7188 14.6875C15.8316 13.9456 16.5 12.6967 16.5 11.3593Z"
        stroke={color}
        stroke-width="2"
      />
    </svg>
  );
};

export default TrophyIcon;