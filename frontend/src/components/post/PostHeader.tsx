import React, { useState } from "react";
import UserTypes from "../../types/User";
import PostTypes from "../../types/Post";
import moment from "moment";
import PostMenu from "./post-menu/PostMenu";
import { MenuIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";
import Avatar from "../avatar/Avatar";

type PostHeaderProps = {
  user: UserTypes;
  post: PostTypes;
  quoteReposted?: boolean;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  user,
  post,
  quoteReposted,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

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
    <div className="post-header">
      <div className="avatar">
        <Avatar userId={post.user_id} src={user.avatar} />
      </div>
      <div className={quoteReposted ? "qr_user" : "user"}>
        <p className="name">{user.name}</p>
        <p className="username">
          @{user.username} ·{" "}
          <span className="date">{moment(post.created_at).fromNow()}</span>
        </p>
      </div>

      {!quoteReposted && (
        <div className="menu">
          <p onClick={() => setOpenMenu(!openMenu)}>
            <MenuIcon color={COLOR_CONSTANTS.LIGHTGRAY} size={20} />
          </p>
          <PostMenu
            isOpen={openMenu}
            onClose={handleMenuClose}
            postId={post.id}
            type={post.type}
          />
        </div>
      )}
    </div>
  );
};

export default PostHeader;
