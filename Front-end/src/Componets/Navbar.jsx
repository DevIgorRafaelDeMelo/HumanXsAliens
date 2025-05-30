import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-cyan-500 w-full p-4">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:underline">
              Início
            </Link>
          </li>
          <li>
            <Link to="/map" className="text-white hover:underline">
              Map
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
