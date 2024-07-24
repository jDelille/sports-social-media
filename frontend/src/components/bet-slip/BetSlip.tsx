import React from "react";
import Modal from "../modal/Modal";
import { useBetSlip } from "../../hooks";
import { TrashIcon } from "../../icons";

type BetSlipProps = {};
const BetSlip: React.FC<BetSlipProps> = () => {
  const betSlip = useBetSlip();
  const bet = betSlip.bet;

  const bodyContent = (
    <div className="bet-body">
      <div className="bet-content">
        <div className="info">
          <div className="text">
            <p className="type">
              {bet?.type}
              {" -"}

              <span className="description">{bet?.description}</span>
            </p>

            <span className="price">{bet?.price}</span>
          </div>
        </div>
        <input type="text" placeholder="Enter wager" />
        <div className="delete-pick">
        <TrashIcon size={20} color="#e2434b" />
        </div>
      </div>

      <div className="payout-wrapper">
        <p className="wagered">Wagered $100.00</p>
        <p className="payout">Payout $1000.75</p>
      </div>

      <button className="confirm-btn">Confirm Picks</button>
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
};

export default BetSlip;
