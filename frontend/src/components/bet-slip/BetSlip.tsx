import React from "react";
import Modal from "../modal/Modal";
import { useBetPostModal, useBetSlip } from "../../hooks";
import betslipStore from "../../store/betslipStore";
import { observer } from "mobx-react";
import BetSlipPick from "./BetSlipPick";
import './betslip.scss';

type BetSlipProps = {};
const BetSlip: React.FC<BetSlipProps> = observer(() => {
  const betSlip = useBetSlip();
  const betPostModal = useBetPostModal();

  const betstore = betslipStore;
  const picks = betstore.getPicks();

  const handleConfirmPicks = () => {
    betSlip.onClose();
    betPostModal.onOpen();
  };

  const hasPicks = picks.length > 0;

  const bodyContent = (
    <div className="bet-body">
      <div className="bet-content-wrapper">
        {!hasPicks && <div>You have not added any picks yet.</div>}
        {hasPicks &&
          picks.map((pick) => (
            <BetSlipPick pick={pick} />
          ))}
      </div>

      {betstore.isParlay && (
        <div className="bet-amount">
          <div className="wager-wrapper">
            <label htmlFor="wager">Wager</label>
            <input type="text" name="wager" placeholder="$0.00" />
          </div>
          <div className="payout-wrapper">
            <label className="payout">Payout </label>
            <p>$1000.75</p>
          </div>
        </div>
      )}

      {hasPicks && (
        <button onClick={() => betstore.toggleParlay()} className="parlay-btn">
          parlay {betstore.isParlay ? "on" : "off"}
        </button>
      )}

      <button
        className="confirm-btn"
        onClick={handleConfirmPicks}
        disabled={!hasPicks}
      >
        Confirm Picks
      </button>
    </div>
  );

  const handleClose = () => {
    betSlip.onClose();
  };

  return (
    <div className="bet-slip">
      <Modal
        title="Bet slip"
        body={bodyContent}
        isOpen={betSlip.isOpen}
        onClose={handleClose}
      />
    </div>
  );
});

export default BetSlip;
