import React from 'react';
import Skeleton from 'react-loading-skeleton';

type ProfileHeaderSkeletonProps = {
 
 }
const ProfileHeaderSkeleton: React.FC<ProfileHeaderSkeletonProps> = () => {
  return (
    <div className="profile-header-skeleton">
      <Skeleton className='name'/>
      <Skeleton className='username'/>
      <div className="relationships">
        <Skeleton className='follow' />
        <Skeleton className='follow' />
        <Skeleton className='follow' />
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;