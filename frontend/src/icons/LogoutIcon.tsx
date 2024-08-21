import React from "react";

type LogoutIconProps = {
  size: number;
  color: string;
};

const LogoutIcon: React.FC<LogoutIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.92893 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.0222 21.4135 8.08879 20.3147 6.4443C19.2159 4.79981 17.6541 3.51808 15.8268 2.76121C13.9996 2.00433 11.9889 1.8063 10.0491 2.19215C8.10929 2.578 6.32746 3.53041 4.92893 4.92893"
        stroke={color}
        stroke-width="2"
      />
      <path
        d="M15 12L15.7809 11.3753L16.2806 12L15.7809 12.6247L15 12ZM3 13C2.44771 13 2 12.5523 2 12C2 11.4477 2.44771 11 3 11V13ZM11.7809 6.3753L15.7809 11.3753L14.2191 12.6247L10.2191 7.6247L11.7809 6.3753ZM15.7809 12.6247L11.7809 17.6247L10.2191 16.3753L14.2191 11.3753L15.7809 12.6247ZM15 13H3V11H15V13Z"
        fill={color}
      />
    </svg>
  );
};

export default LogoutIcon;
