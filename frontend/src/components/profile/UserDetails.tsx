import { CalendarIcon, LocationIcon, MenuDotsIcon } from "../../icons";
import UserTypes from "../../types/User";
import moment from "moment";
import Relationships from "./Relationships";
import ActionButtons from "./ActionButtons";
import { useRef, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { useClickOutside, useHideUrlsInBody } from "../../hooks";
import { useNavigate } from "react-router-dom";

type UserDetailsProps = {
  user: UserTypes;
  currentUser: any;
  setSelectedFeed: (val: string) => void;
};

const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  currentUser,
  setSelectedFeed,
}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); 
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const joinedDate = moment(user?.created_at).format("MMMM YYYY");
  const isUserProfile = currentUser?.id === user?.id;

  const handleOpenMenu = (e: React.MouseEvent) => {
    e.stopPropagation();  // Prevent the click event from bubbling up
    setIsMenuOpen((prev) => !prev);  // Toggle the menu state
  };

  useClickOutside(menuRef, (event) => {
    if (buttonRef.current && buttonRef.current.contains(event?.target as Node)) {
      return; // Ignore clicks on the button itself
    }
    setIsMenuOpen(false); // Close the menu for any other outside click
  }, isMenuOpen);

  const handleHashtagClick = (hashtag: string, e: any) => {
    e.stopPropagation();
    navigate(`/discover/hashtag/${hashtag}`);
  };


  const hideUrlsInBody = useHideUrlsInBody({
    handleHashtagClick,
    isHashtagPage: false,
    hashtag: ""
  });

  return (
    <div className="user-content">
      {/* <div className="funds-wrapper">
        <p className="funds">{user?.funds} coins</p>
      </div> */}
       <div className="menu-wrapper">
        <div ref={buttonRef} className="menu-btn" onClick={handleOpenMenu}>
          <MenuDotsIcon color="black" size={20} />
        </div>

        {isMenuOpen && (
          <div ref={menuRef} className="hide">
            <ProfileMenu isUserProfile={isUserProfile} username={user.username} />
          </div>
        )}

        <ActionButtons
          isUserProfile={isUserProfile}
          user={user}
          currentUser={currentUser}
        />
      </div>
      
      <p className="name">{user?.name}</p>
      <p className="username">@{user?.username}</p>
      {user?.bio && <p className="bio">{hideUrlsInBody(user.bio)}</p>}

      <Relationships
        userId={user?.id}
        setSelectedFeed={setSelectedFeed}
        currentUserId={currentUser?.id}
      />

      {user?.website && (
        <div className="website">
          <a href={user?.website} target="_blank">
            {user?.website}
          </a>
        </div>
      )}

      <div className="joined">
        <CalendarIcon size={15} color="#868393" /> Joined {joinedDate}
        {user?.location && (
          <div className="location">
            <LocationIcon size={16} color="#868393" />
            <span>{user?.location}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
