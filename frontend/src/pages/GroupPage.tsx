import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components';
import GroupHeader from '../components/group/GroupHeader';
import { Group } from '../types/GroupTypes';
import './page.scss';
import { useAxios } from '../hooks';
import { useParams } from 'react-router-dom';

type GroupPageProps = {
 
 }
const GroupPage: React.FC<GroupPageProps> = () => {

  const [group, setGroup] = useState<Group>()
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {groupId} = useParams();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await useAxios.get(`/group/${groupId}`)
        setGroup(response.data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }

    fetchGroup();
  }, [])

  return (
    <div className="page group-page">
      <PageHeader title='Group name' hasBack/>
      <GroupHeader group={group} />
    </div>
  );
};

export default GroupPage;