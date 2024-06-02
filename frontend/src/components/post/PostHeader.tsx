import React from 'react';
import UserTypes from '../../types/User';
import PostTypes from '../../types/Post';
import moment from "moment";

type PostHeaderProps = {
    user: UserTypes;
    post: PostTypes;
 }

const PostHeader: React.FC<PostHeaderProps> = ({user, post}) => {

  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "1s",
      ss: "%ds",
      m: "1m",
      mm: "%dm",
      h: "1hr",
      hh: "%dhr",
      d: "1d",
      dd: "%dd",
      w: "1w",
      ww: "%dw",
      M: "1mo",
      MM: "%dmo",
      y: "1yr",
      yy: "%dyrs",
    },
  });

  return (
    <div className='post-header'>
      <div className="avatar">
        <img src='../avatar-placeholder.png' />
      </div>
      <div className="user">
        <p className='name'>{user.name}</p>
        <p className='username'>{user.username} · <span className='date'>{moment(post.created_at).fromNow()}</span></p>
      </div>
      <div className="date">
        
      </div>
    </div>
  );
};

export default PostHeader;