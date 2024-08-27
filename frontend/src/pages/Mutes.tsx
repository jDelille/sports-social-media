import React from 'react';
import { PageHeader } from '../components';

type MutesProps = {
 
 }
const Mutes: React.FC<MutesProps> = () => {
  const mutes = [];
  return (
    <div className="page mutes-page">
      <PageHeader title='Muted Users & Words' hasBack/>
      {mutes.length === 0 && (
        <div className="empty">
          <p>You have not muted any accounts or words yet. When you mute an account or word, you will see it here.</p>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default Mutes;