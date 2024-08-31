import React, { ReactElement, useEffect, useState } from "react";
import { CloseIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";
import "./popup.scss";

type PopupProps = {
  isOpen: boolean;
  body: ReactElement;
  onClose: () => void;
  hideHeader?: boolean;
};

const Popup: React.FC<PopupProps> = ({ isOpen, body, onClose, hideHeader }) => {
  // const [showPopup, setShowPopup] = useState(false);

  // useEffect(() => {
  //   setShowPopup(isOpen);
  // }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="popup">
        {!hideHeader && (
          <div className="header">
            <div className="close" onClick={onClose}>
              <CloseIcon size={20} color={COLOR_CONSTANTS.LIGHTGRAY} />
            </div>
          </div>
        )}

        <div className="body">{body}</div>
      </div>
    </div>
  );
};

export default Popup;
