import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components';
import { Group } from '../types/GroupTypes';
import { useAxios } from '../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import './page.scss';

type ManageGroupProps = {
    
 }
const ManageGroup: React.FC<ManageGroupProps> = () => {
    const {groupId} = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState<Group>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGroup = async () => {
          try {
            const response = await useAxios.get(`/group/${groupId}`);
            setGroup(response.data);
          } catch (err) {
            setError("Failed to load users");
          } finally {
            setLoading(false);
          }
        };
    
        fetchGroup();
      }, []);

      const handleDeleteClick = async () => {
        if (window.confirm(`Are you sure you want to delete the group "${group?.name}"? This action cannot be undone.`)) {
          try {
            await useAxios.delete(`/group/${groupId}`, {
              data: { groupId },
            });
            navigate('/groups'); // Redirect to a groups list page or any other appropriate route after deletion
          } catch (err) {
            setError("Failed to delete group");
          }
        }
      };

  return (
    <div className="page manage-group">
      <PageHeader title='Manage Group' hasBack/>
      <div className="options">
        {loading && <div>Loading...</div>}
        {error && <div>Error</div>}
        <div className="delete">
            <p>Delete group</p>
            <button onClick={handleDeleteClick}>Delete</button>
            </div>
      </div>
    </div>
  );
};

export default ManageGroup;