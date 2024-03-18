
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Code Snippets</Link>
        <div>
          <Link to="/form" className="text-white mr-4">Submit Code</Link>
          <Link to="/snippets" className="text-white">View Snippets</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
