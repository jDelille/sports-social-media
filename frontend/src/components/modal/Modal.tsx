import React, { ReactElement, useEffect, useState } from 'react';
import { COLOR_CONSTANTS } from '../../constants';
import { BackIcon, CloseIcon } from '../../icons';
import './modal.scss';

type ModalProps = {
    isOpen: boolean;
    body: ReactElement | null;
    onClose: () => void;
    title: string;
    previousModal?: () => void;
    hasBack?: boolean;
  };

const Modal: React.FC<ModalProps> = ({ isOpen, body, onClose, title, previousModal, hasBack }) => {
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
          {hasBack && (
            <BackIcon color='black' size={28} onClick={previousModal} />
          )}
            <h3>{title}</h3>
            <div className="close" onClick={onClose}>
                <CloseIcon size={22} color={COLOR_CONSTANTS.LIGHTGRAY} />
            </div>
        </div>
        <div className="body">
            {body}
        </div>
    </div>
  </div>;
};

export default Modal;