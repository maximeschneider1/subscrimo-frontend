import React from 'react';
import Home from './Home'; 
const Navbar = ({ setComponent }) => {
    return (
      <nav className="bg-gray-800 w-64 min-h-screen px-4 tex-gray-300">
        <ul>
          <li>
            <button onClick={() => setComponent(<Home />)} className="text-gray-300 hover:text-white">
              Home
            </button>
          </li>
          <li>
          </li>
        </ul>
      </nav>
    );
  };
  export default Navbar;