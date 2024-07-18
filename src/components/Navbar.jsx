/* eslint-disable no-unused-vars */

import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const [displayNavItems, setDisplayNavItems] = useState(false);

  const handleMenu = () => {
    setDisplayNavItems((prev) => !prev);
  };

  return (
    <nav className="w-full p-4 navbar-shadow bg-white">
      <div className="flex justify-between items-center w-[95%] ml-4 relative">
        <div className="ml-[1%] md:ml-[5%]">
          <p className="p-2 text-lg text-red-700 uppercase font-serif md:text-2xl">
            foodStore
          </p>
        </div>

        {/* Hidden on large screens, visible on medium and smaller screens */}
        <button
          className="lg:hidden bg-violet-600 text-white rounded-md mr-[5%] p-2"
          onClick={handleMenu}
          aria-label={displayNavItems ? "Close menu" : "Open menu"}
        >
          {!displayNavItems ? <MenuIcon /> : <CloseIcon />}
        </button>

        {/* Nav items for large screens */}
        <div className="hidden lg:flex gap-4 md:mr-[5%]">
          <NavLink
            to="/home"
            className="p-2 text-red-700 uppercase cursor-pointer"
            aria-label="Home"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="p-2 text-red-700 uppercase"
            aria-label="About"
          >
            About
          </NavLink>
          <NavLink
            to="/project"
            className="p-2 text-red-700 uppercase"
            aria-label="Project"
          >
            Project
          </NavLink>
          <NavLink
            to="/contact"
            className="p-2 text-red-700 uppercase"
            aria-label="Contact"
          >
            Contact
          </NavLink>
        </div>

        {/* Nav items for medium and smaller screens */}
        {displayNavItems && (
          <div
            className="lg:hidden w-[90%] md:w-[70%] mt-72 p-4 flex flex-col absolute right-4 gap-3 bg-emerald-800"
            role="menu"
          >
            <NavLink
              to="/home"
              className="navmenu p-2 text-yellow-300 uppercase"
              aria-label="Home"
              role="menuitem"
              onClick={handleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="navmenu p-2 text-yellow-300 uppercase"
              aria-label="About"
              role="menuitem"
              onClick={handleMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/project"
              className="navmenu p-2 text-yellow-300 uppercase"
              aria-label="Project"
              role="menuitem"
              onClick={handleMenu}
            >
              Project
            </NavLink>
            <NavLink
              to="/contact"
              className="navmenu p-2 text-yellow-300 uppercase"
              aria-label="Contact"
              role="menuitem"
              onClick={handleMenu}
            >
              Contact
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
