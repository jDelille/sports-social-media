import React, { ReactElement, useEffect, useState } from 'react';
import './modal.scss';
type ModalProps = {
    isOpen: boolean;
    body: ReactElement;
    onClose: () => void;
    title: string;
  };

const Modal: React.FC<ModalProps> = ({ isOpen, body, onClose, title }) => {
    const [showModal, setShowModal] = useState(false);

    
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return <div className="overlay">
    <div className="modal">
        <div className="header">
            <h3>{title}</h3>
            <div className="close" onClick={onClose}>
                {/* <CloseIcon size={20} color={COLOR_CONSTANTS.LIGHTGRAY} /> */}
                <p>close</p>
            </div>
        </div>
        <div className="body">
            {body}
        </div>
    </div>
  </div>;
};

export default Modal;