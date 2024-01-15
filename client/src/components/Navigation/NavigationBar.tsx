import React, { useState } from "react";
import "../Navigation/navigation-bar.css";
import { Link, NavLink } from "react-router-dom";

function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to={"/"} className="site-title">
        <div></div>
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/payhost"}>Payor</NavLink>
        </li>
        <li>
          <NavLink to={"/host"}>Payee</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
