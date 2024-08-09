import React, { useState } from 'react';
import './betamount.scss';

const BetAmount: React.FC = () => {
  const [payout, setPayout] = useState<number>(0);

  return (
    <div className="bet-amount">
    <div className="wager-wrapper">
      <input type="text" name="wager" placeholder="$0.00" />
      <label htmlFor="wager">Wager</label>

    </div>
    <div className="payout-wrapper">
      <p className='payout'>${payout || "0.00"}</p>
      <label >Potential winnings</label>

    </div>
  </div>
  )

}

export default BetAmount;