import React from "react";
import Modal from "../modal/Modal";
import { useBetPostModal, useBetSlip } from "../../hooks";
import betslipStore from "../../store/betslipStore";
import { observer } from "mobx-react";
import BetSlipPick from "./BetSlipPick";
import BetAmount from "./BetAmount";
import EmptyState from "./EmptyState";

import './betslip.scss';
import BetControls from "./BetControls";

const BetSlip: React.FC = observer(() => {
  const betSlip = useBetSlip();
  const betPostModal = useBetPostModal();
  const betstore = betslipStore;
  const picks = betstore.getPicks();

  const handleConfirmPicks = () => {
    betSlip.onClose();
    betPostModal.onOpen();
  };

  const renderBodyContent = () => {
    if (picks.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="bet-content-wrapper">
        {picks.map((pick) => (
          <BetSlipPick key={pick.id} pick={pick} />
        ))}
        {betstore.isParlay && <BetAmount />}
        <BetControls />
    
        <button
          className="confirm-btn"
          onClick={handleConfirmPicks}
          disabled={picks.length === 0}
        >
          Confirm Picks
        </button>
     
      </div>
    );
  };

  return (
    <div className="bet-slip">
      <Modal
        title="Bet slip"
        body={renderBodyContent()}
        isOpen={betSlip.isOpen}
        onClose={betSlip.onClose}
      />
    </div>
  );
});

export default BetSlip;