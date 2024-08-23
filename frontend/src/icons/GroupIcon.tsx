import React from "react";

type GroupIconProps = {
  size: number;
  color: string;
};

const GroupIcon: React.FC<GroupIconProps> = ({ size, color }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 3H19C20.1046 3 21 3.89543 21 5V7M17 21H19C20.1046 21 21 20.1046 21 19V17M7 3H5C3.89543 3 3 3.89543 3 5V7M7 21H5C3.89543 21 3 20.1046 3 19V17"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M14.0662 15.9978L14 15L14.0003 16.9956L14.0662 15.9978ZM18.6875 14.9142L17.7672 15.3055V15.3055L18.6875 14.9142ZM14.0833 13.7504L13.3859 13.0338L12.648 13.7518L13.3873 14.4684L14.0833 13.7504ZM14.8317 15.0178L15.7869 14.7216L14.8317 15.0178ZM14.1328 15L14.1321 15L14.0003 16.9956C14.0442 16.9985 14.0884 17 14.1328 17V15ZM17.8673 15H14.1328V17H17.8673V15ZM17.7672 15.3055C17.7562 15.2794 17.7452 15.2308 17.754 15.1712C17.7623 15.1147 17.7848 15.0723 17.8056 15.046C17.8442 14.997 17.8752 15 17.8673 15V17C18.4609 17 19.0196 16.7369 19.3768 16.2834C19.7483 15.8118 19.8768 15.1557 19.6078 14.523L17.7672 15.3055ZM16.0001 14C16.9743 14 17.473 14.6134 17.7672 15.3055L19.6078 14.523C19.1718 13.4974 18.1397 12 16.0001 12V14ZM14.7807 14.4671C15.051 14.2041 15.423 14 16.0001 14V12C14.8632 12 14.0008 12.4354 13.3859 13.0338L14.7807 14.4671ZM13.3873 14.4684C13.6258 14.6996 13.7806 15.0044 13.8766 15.314L15.7869 14.7216C15.6273 14.2069 15.3323 13.5684 14.7794 13.0324L13.3873 14.4684ZM13.8766 15.314C13.8667 15.2821 13.8608 15.2318 13.873 15.174C13.8846 15.1186 13.9085 15.0766 13.9308 15.0495C13.9523 15.0233 13.9719 15.0111 13.9822 15.0059C13.9931 15.0006 13.9993 15.0001 14 15L14.1325 16.9956C14.6494 16.9613 15.1427 16.7245 15.4755 16.3199C15.8222 15.8983 15.9709 15.3152 15.7869 14.7216L13.8766 15.314Z"
        fill={color}
      />
      <path
        d="M9.9167 13.7504L10.6127 14.4684L11.352 13.7518L10.6141 13.0337L9.9167 13.7504ZM5.31252 14.9142L6.23281 15.3055L5.31252 14.9142ZM9.9338 15.9978L9.9997 16.9956L10 15L9.9338 15.9978ZM9.16826 15.0178L10.1234 15.314L10.1234 15.314L9.16826 15.0178ZM8 14C8.57703 14 8.94899 14.2041 9.2193 14.4671L10.6141 13.0337C9.9992 12.4354 9.13686 12 8 12V14ZM6.23281 15.3055C6.527 14.6134 7.02571 14 8 14V12C5.86036 12 4.82825 13.4973 4.39223 14.523L6.23281 15.3055ZM6.13277 15C6.12488 15 6.15586 14.997 6.19444 15.046C6.21522 15.0723 6.23774 15.1147 6.24608 15.1712C6.25488 15.2308 6.24389 15.2794 6.23281 15.3055L4.39223 14.523C4.12327 15.1557 4.25175 15.8117 4.62323 16.2834C4.9804 16.7369 5.53917 17 6.13277 17V15ZM9.86721 15H6.13277V17H9.86721V15ZM9.8679 15L9.86721 15V17C9.9116 17 9.95578 16.9985 9.9997 16.9956L9.8679 15ZM10 15C10.0007 15.0001 10.0069 15.0006 10.0178 15.0059C10.0281 15.0111 10.0477 15.0233 10.0692 15.0495C10.0915 15.0766 10.1154 15.1186 10.127 15.174C10.1392 15.2318 10.1333 15.2821 10.1234 15.314L8.21313 14.7216C8.02907 15.3152 8.17779 15.8983 8.52454 16.3199C8.85734 16.7245 9.35068 16.9613 9.86756 16.9956L10 15ZM10.1234 15.314C10.2194 15.0044 10.3742 14.6996 10.6127 14.4684L9.22067 13.0324C8.6677 13.5684 8.37275 14.2069 8.21313 14.7216L10.1234 15.314Z"
        fill={color}
      />
      <path
        d="M12 13C13.8516 13 14.5604 14.1429 14.8317 15.0178C14.9953 15.5453 14.5523 16 14 16H10C9.44772 16 9.00469 15.5453 9.16826 15.0178C9.43957 14.1429 10.1484 13 12 13Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <circle cx="12" cy="9" r="2" fill={color} />
      <circle cx="16" cy="9" r="2" fill={color} />
      <circle cx="8" cy="9" r="2" fill={color} />
    </svg>
  );
};

export default GroupIcon;