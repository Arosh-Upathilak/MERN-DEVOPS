import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex flex-col justify-center items-center px-16 py-8 bg-black/5 gap-5">
      <h1 className="text-3xl font-bold">WellCome to Note Application</h1>
      <Link to="/createNote">
        <button className="p-2 bg-green-500 hover:bg-green-700 duration-100 transition-all cursor-pointer rounded-md text-white">
          Create a Note
        </button>{' '}
      </Link>
    </nav>
  );
}

export default Navbar;
