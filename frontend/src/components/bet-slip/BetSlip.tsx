import React from 'react';
import Modal from '../modal/Modal';
import { useBetSlip } from '../../hooks';

type BetSlipProps = {
 
 }
const BetSlip: React.FC<BetSlipProps> = () => {

    const betSlip = useBetSlip();
    const bet = betSlip.bet;

    const bodyContent = (
        <div>
            <p>{bet?.description}</p>
            <p>{bet?.price}</p>

            <input type="text" placeholder='Enter wager' />
        </div>
    )

    const handleClose = () => {
        betSlip.onClose();
    }

  return (
    <div className="bet-slip">
      <Modal
        title='Bet slip'
        body={bodyContent}
        isOpen={betSlip.isOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default BetSlip;