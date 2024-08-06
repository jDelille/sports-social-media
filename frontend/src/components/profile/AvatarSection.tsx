import UserTypes from "../../types/User";
import Avatar from "../avatar/Avatar";

const AvatarSection: React.FC<{ user: UserTypes }> = ({ user }) => {
    const isVerified = user?.isVerified === 1;

    return (
        <div
        className="header-img"
        style={{
          backgroundImage: `url(${user?.header_img})`,
          backgroundSize: "cover",
          backgroundPositionY: "-40px",
        }}
      >
        <Avatar src={user?.avatar} username={user?.username as string} isVerified={isVerified} />
      </div>
    )
   
};

  export default AvatarSection;