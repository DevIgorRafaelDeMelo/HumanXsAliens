import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="  hover:underline">
              Início
            </Link>
          </li>
          <li>
            <Link to="/map" className="  hover:underline">
              Map
            </Link>
          </li>
         
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
