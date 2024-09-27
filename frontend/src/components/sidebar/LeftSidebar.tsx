import React, { ReactElement, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BellIcon,
  ChartIcon,
  CompassIcon,
  GroupIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
  TrophyIcon,
} from "../../icons";
import SearchBar from "../search-bar/SearchBar";
import useSidebar from "../../hooks/useSidebar";
import "./sidebar.scss";
import { getAlertCount } from "../../hooks/alerts/useAlertCount";

type LeftSidebarProps = {
  currentUser: any | null;
};
const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentUser }) => {
  const [alertCount, setAlertCount] = useState<number | null>(null);
  const [hasAlert, setHasAlert] = useState(false);
  const navigate = useNavigate();

  const {
    handleOpenLogin,
    handleOpenSignup,
    handleOpenCreatePost,
    handleLogout,
  } = useSidebar();

  const handleLogoClick = () => {
    navigate('/home');
  }

  useEffect(() => {
    const fetchAlertCount = async () => {
      try {
        const count = await getAlertCount();
        setAlertCount(count);
        setHasAlert(count > 0);
      } catch (err) {
        console.error("Failed to fetch alert count", err);
      }
    };

    fetchAlertCount();
  }, []);

  const MenuItem: React.FC<{
    to: string;
    label: string;
    icon: ReactElement;
  }> = ({ to, label, icon }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "active menu-item" : "menu-item"
      }
    >
      {icon}
      {hasAlert && label === "Alerts" && (
        <div className="circle">
          <p>{alertCount}</p>
        </div>
      )}
      {label}
    </NavLink>
  );

  return (
    <div className="sidebar-container">
      <div className="sidebar left-sidebar">
        <div className="title">
          <LogoIcon size={100} color="black" onClick={handleLogoClick} />
        </div>

        <ul className="sidebar-links">
          {currentUser ? (
            <>
              <SearchBar />
              <MenuItem
                to="/home"
                label="Home"
                icon={<HomeIcon size={20} color="#888595" />}
              />
              <MenuItem
                to="/matches"
                label="Discover"
                icon={<CompassIcon size={20} color="#888595" />}
              />
              <MenuItem
                to="/alerts"
                label="Alerts"
                icon={<BellIcon size={20} color="#888595" />}
              />
              <MenuItem
                to="/matches"
                label="Matches"
                icon={<TrophyIcon size={20} color="#888595" />}
              />
              <MenuItem
                to="/groups"
                label="Groups"
                icon={<GroupIcon size={20} color="#888595" />}
              />
              <MenuItem
                to={`/profile/${currentUser.username}`}
                label="Profile"
                icon={<ProfileIcon size={20} color="#888595" />}
              />
               <MenuItem
                to="/leaderboard"
                label="Leaderboard"
                icon={<TrophyIcon size={20} color="#888595" />}
              />
              <MenuItem
                to="/bet-history"
                label="Bet History"
                icon={<ChartIcon size={20} color="#888595" />}
              />
              <MenuItem
                to="/settings"
                label="Settings"
                icon={<SettingsIcon size={20} color="#888595" />}
              />
              <li onClick={handleLogout} className="menu-item">
                <LogoutIcon size={20} color="#888595" />
                <a>Logout</a>
              </li>
              <button className="post-btn" onClick={handleOpenCreatePost}>
                Compose
              </button>
            </>
          ) : (
            <>
              <MenuItem
                to="/home"
                label="Home"
                icon={<HomeIcon size={20} color="#888595" />}
              />
              <MenuItem
                to="/matches"
                label="Discover"
                icon={<CompassIcon size={20} color="#888595" />}
              />
              <li onClick={handleOpenLogin} className="menu-item">
                <a>Login</a>
              </li>
              <li onClick={handleOpenSignup} className="menu-item">
                <a>Sign up</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
