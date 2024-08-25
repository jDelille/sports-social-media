import React from "react";
import "./siteLinks.scss";
import { Link } from "react-router-dom";

type SiteLinksProps = {};
const SiteLinks: React.FC<SiteLinksProps> = () => {
  return (
    <div className="site-links">
      <Link to={'/blocks'} className="link">Blocks </Link>
      <p>&#8226;</p>
      <Link to={'/mutes'} className="link">Mutes</Link>
      <p>&#8226;</p>
      <Link to={'/blocks'} className="link">Help Center</Link>
      <p>&#8226;</p>
      <Link to={'/blocks'} className="link">Github</Link>
      <p>&#8226;</p>
      <p className="link">Logout</p>

      <span>Huddle is designed and developed by Justin Delille.</span>
    </div>
  );
};

export default SiteLinks;
