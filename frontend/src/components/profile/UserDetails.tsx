import { CalendarIcon, LocationIcon, MenuDotsIcon } from "../../icons";
import UserTypes from "../../types/User";
import moment from "moment";
import Relationships from "./Relationships";
import ActionButtons from "./ActionButtons";

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
  const joinedDate = moment(user?.created_at).format("MMMM YYYY");
  const isUserProfile = currentUser?.id === user?.id;

  return (
    <div className="user-content">
      <div className="menu-wrapper">
        <div className="menu-btn">
          <MenuDotsIcon color="black" size={20} />
        </div>

        <ActionButtons
          isUserProfile={isUserProfile}
          user={user}
          currentUser={currentUser}
        />
      </div>

      <p className="name">{user?.name}</p>
      <p className="username">@{user?.username}</p>
      {user?.bio && <p className="bio">{user?.bio}</p>}

      <Relationships userId={user?.id} setSelectedFeed={setSelectedFeed} currentUserId={currentUser?.id} />

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
