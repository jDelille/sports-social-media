import React from 'react';

type ChevronRightProps = {
  size: number;
  color: string;
};

const ChevronRight: React.FC<ChevronRightProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
<path d="M9 6L15 12L9 18" stroke={color} stroke-width="2"/>

    </svg>
  );
};

export default ChevronRight;