import React, { ReactElement, useEffect, useState } from "react";
import './popup.scss';

type PopupProps = {
  isOpen: boolean;
  body: ReactElement;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ isOpen, body, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="popup">
        <div className="header">
        <div className="close" onClick={onClose}>
                {/* <CloseIcon size={20} color={COLOR_CONSTANTS.LIGHTGRAY} /> */}
                <p>close</p>
            </div>
        </div>
        <div className="body">{body}</div>
      </div>
    </div>
  );
};

export default Popup;
