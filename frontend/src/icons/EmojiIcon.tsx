import React from 'react';

type EmojiIconProps = {
    size: number;
    color: string;
    onClick: () => void;
}

const EmojiIcon: React.FC<EmojiIconProps> = ({size, color, onClick}) => {
  return (
    <svg width={size} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
<circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
<circle cx="9" cy="10" r="1.25" fill={color} stroke={color} strokeWidth="0.5" strokeLinecap="round"/>
<circle cx="15" cy="10" r="1.25" fill={color} stroke={color} strokeWidth="0.5" strokeLinecap="round"/>
<path fillRule="evenodd" clipRule="evenodd" d="M8.62886 15C8.34908 15 8.20919 15 8.13456 15.1068C8.05993 15.2136 8.1032 15.3318 8.18974 15.5683C8.70586 16.9788 10.2166 18 12 18C13.7833 18 15.2941 16.9788 15.8102 15.5683C15.8968 15.3318 15.94 15.2136 15.8654 15.1068C15.7908 15 15.6509 15 15.3711 15H8.62886Z" fill={color}/>
</svg>

  );
};

export default EmojiIcon;