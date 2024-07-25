import React, { useState } from "react";
import { useBetPostModal, useBetSlip } from "../../hooks";
import Modal from "../modal/Modal";
import MentionsTextarea from "../mentions-textarea/MentionsTextarea";
import betslipStore, { Pick } from "../../store/betslipStore";

type BetPostModalProps = {};

const BetPostModal: React.FC<BetPostModalProps> = () => {
  const [file, setFile] = useState(null);
  const [body, setBody] = useState("");

  const betPostModal = useBetPostModal();
  const betslip = useBetSlip();

  const betstore = betslipStore;

  const bodyContent = (
    <div className="bet-post-modal">
        <div className="picks">
            {betstore.picks.map((pick: Pick) => (
                <div className="pick">
                    <p>{pick.description}</p>
                </div>
            ))}
        </div>
    <div className="textarea-wrapper">
      <MentionsTextarea
        setBody={setBody}
        body={body}
        setFile={setFile}
        file={file}
        handleClick={(e) => console.log(e)}
        placeholder="Got something to say?"
        isActive
      />
    </div>
    <button className="submit-btn">Post your bet</button>
    </div>
    
  );

  const handleClose = () => {
    betPostModal.onClose();
  };

  const previousModal = () => {
    betPostModal.onClose();
    betslip.onOpen();
  }

  return (
    <div className="bet-post-modal">
      <Modal
        body={bodyContent}
        title="Compose"
        onClose={handleClose}
        isOpen={betPostModal.isOpen}
        hasBack={true}
        previousModal={previousModal}
      />
    </div>
  );
};

export default BetPostModal;
