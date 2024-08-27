import React from 'react';
import { PageHeader } from '../components';

type BlocksProps = {
 
 }
const Blocks: React.FC<BlocksProps> = () => {
  const blocks = [];
  return (
    <div className="page blocks-page">
      <PageHeader title='Blocked Users' hasBack/>
      {blocks.length === 0 && (
        <div className="empty">
          <p>You have not blocked any accounts yet. When you block an account, you will see it here.</p>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default Blocks;