//import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

// eslint-disable-next-line react/prop-types
const Navbar = ({ session, handleLogout }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="text-white px-4">Home</Link>
          {!session && <Link to="/signin" className="text-white px-4">Sign In</Link>}
          {!session && <Link to="/login" className="text-white px-4">Login</Link>}
          {session && <Link to="/dashboard" className="text-white px-4">Dashboard</Link>}
          {session && <Link to="/products" className="text-white px-4">Products</Link>}
        </div>
        {session && <button onClick={handleLogout} className="text-white">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
