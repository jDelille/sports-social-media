import React from 'react';
import UserTypes from '../../types/User';

type PostHeaderProps = {
    user: UserTypes;
 }

const PostHeader: React.FC<PostHeaderProps> = ({user}) => {
  return (
    <div className='post-header'>
      <div className="avatar">
        <img src='../avatar-placeholder.png' />
      </div>
      <div className="user">
        <strong>{user.name}</strong>
        <span>{user.username}</span>
      </div>
    </div>
  );
};

export default PostHeader;