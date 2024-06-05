import React from "react";

type PollIconProps = {
    size: number;
    color: string;
    onClick: () => void;
}

const PollIcon: React.FC<PollIconProps> = ({size, color, onClick}) => {
  return (
    <svg width={size} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
<path d="M21 20H3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
<path d="M10 16V10C10 8.89543 9.10457 8 8 8V8C6.89543 8 6 8.89543 6 10V16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
<path d="M18 16V6C18 4.89543 17.1046 4 16 4V4C14.8954 4 14 4.89543 14 6V16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
</svg>

  );
};

export default PollIcon;
