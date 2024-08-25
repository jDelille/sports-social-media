import React from 'react';
import { PageHeader } from '../components';

type BlocksProps = {
 
 }
const Blocks: React.FC<BlocksProps> = () => {
  return (
    <div className="page blocks-page">
      <PageHeader title='Blocked Users' hasBack/>
    </div>
  );
};

export default Blocks;