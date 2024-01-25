import React, { useEffect, useState } from "react";
import "./Header.css";
import oktagon_schedule_header_2 from "../images/oktagon_schedule_header_2.png";

const Header: React.FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <>
      <div className="header">
        <img className="oktagon-logo" src={oktagon_schedule_header_2} alt="" />
      </div>
      <div className={`yellow-border ${active ? "active" : ""}`}></div>
    </>
  );
};

export default Header;
