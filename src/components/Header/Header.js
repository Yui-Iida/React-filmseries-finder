import React from "react";
import "./Header.css";

function Header() {
  return (
    <span onClick={() => window.scrollTo(0, 0)} className="header">
      Film & Series Finder
    </span>
  );
}

export default Header;
