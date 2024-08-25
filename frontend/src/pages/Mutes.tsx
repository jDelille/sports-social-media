import React from 'react';
import { PageHeader } from '../components';

type MutesProps = {
 
 }
const Mutes: React.FC<MutesProps> = () => {
  return (
    <div className="page mutes-page">
      <PageHeader title='Muted Users & Keywords' hasBack/>
    </div>
  );
};

export default Mutes;