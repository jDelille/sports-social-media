import React from 'react';
import { PageHeader } from '../components';
import './page.scss';

type GroupPageProps = {
 
 }
const GroupPage: React.FC<GroupPageProps> = () => {
  return (
    <div className="page group-page">
      <PageHeader title='Group name' hasBack/>
    </div>
  );
};

export default GroupPage;