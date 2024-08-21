import React from "react";

type CompassIconProps = {
  size: number;
  color: string;
};

const CompassIcon: React.FC<CompassIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.94246 10.6872C9.91195 9.91075 9.91762 9.09875 9.93431 8.42186C10.5289 8.74586 11.2349 9.14694 11.8921 9.5616C12.3721 9.86449 12.8095 10.1643 13.1527 10.4379C13.5227 10.733 13.6888 10.9248 13.7321 10.9999C13.7755 11.0749 13.8585 11.3147 13.9291 11.7827C13.9945 12.2167 14.0354 12.7453 14.0577 13.3125C14.0882 14.089 14.0825 14.901 14.0658 15.5779C13.4713 15.2539 12.7652 14.8528 12.108 14.4381C11.628 14.1352 11.1906 13.8355 10.8475 13.5618C10.4775 13.2667 10.3114 13.0749 10.268 12.9999C10.2247 12.9248 10.1416 12.6851 10.0711 12.2171C10.0057 11.7831 9.96474 11.2544 9.94246 10.6872Z"
        stroke={color}
        stroke-width="2"
      />
      <circle cx="12" cy="12" r="9" stroke={color} stroke-width="2" />
    </svg>
  );
};

export default CompassIcon;
