import React, { useRef, useState } from "react";
import UserTypes from "../../types/User";
import PostTypes from "../../types/Post";
import moment from "moment";
import PostMenu from "./post-menu/PostMenu";
import { CheckIcon, MenuIcon } from "../../icons";
import { COLOR_CONSTANTS } from "../../constants";
import Avatar from "../avatar/Avatar";

type PostHeaderProps = {
  user: UserTypes | undefined;
  post: PostTypes;
  quoteReposted?: boolean;
  hideMenu?: boolean;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  user,
  post,
  quoteReposted,
  hideMenu,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const buttonRef = useRef<HTMLParagraphElement>(null);

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

  const isVerified = user?.isVerified === 1;

  const handleMenuClick = (e: any) => {
    e.stopPropagation();
    setOpenMenu((prev) => !prev);
  };

  return (
    <div className="post-header">
      <div className="avatar">
        <Avatar username={post?.user.username} src={user?.avatar} />
      </div>
      <div className={quoteReposted ? "qr_user" : "user"}>
        <p className="name">
          {user?.name}
          {isVerified && <CheckIcon color="#ff4775" size={34} />}
        </p>
        <p className="username">
          @{user?.username} ·{" "}
          <span className="date">{moment(post?.created_at).fromNow()}</span>
        </p>
      </div>

      {!hideMenu && !quoteReposted && (
        <div className={openMenu ? "open-menu" : "menu"}>
          <p onClick={(e) => handleMenuClick(e)} ref={buttonRef}>
            <MenuIcon color={COLOR_CONSTANTS.LIGHTGRAY} size={20} />
          </p>
          <PostMenu
            isOpen={openMenu}
            onClose={handleMenuClose}
            postId={post?.id}
            type={post?.type}
            imagePath={post?.image}
            username={post.user.username}
            buttonRef={buttonRef}
          />
        </div>
      )}
    </div>
  );
};

export default PostHeader;
