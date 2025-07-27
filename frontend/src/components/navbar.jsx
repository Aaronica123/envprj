import React from "react";
import { Link } from "react-router-dom";
// Import icons from lucide-react
import { BarChart, LogIn, Search, MapPin, User, LogOut } from 'lucide-react';
// Import the EwasteOverviewContent component
import EwasteOverviewContent from './EwasteOverviewContent'; // Adjust path if necessary based on your file structure

function NavBar() {
  return (<>
   
    <nav className="bg-gradient-to-r from-green-600 to-green-800 p-4 shadow-lg rounded-b-xl md:rounded-xl md:mx-auto md:max-w-screen-lg flex items-center justify-between flex-wrap mt-20">
      {/* Brand/Logo placeholder - could be an icon or text */}
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-2xl tracking-tight">EcoCollect</span>
      </div>

      {/* Navigation links container */}
      <div className="w-full block flex-grow md:flex md:items-center md:w-auto">
        <div className="text-sm md:flex-grow flex flex-col md:flex-row md:justify-end"> {/* Added flex-col and md:flex-row for stacking and justification */}
          {/* Each Link styled as a button with interactive effects and icons */}
          <Link
            to="/stats"
            className="group block mt-4 md:inline-block md:mt-0 text-green-100 hover:text-white mr-4
                       px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                       hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75
                       flex items-center justify-center md:justify-start" /* Added flex and items-center for icon alignment */
          >
            <BarChart size={20} className="mr-2 transition-colors duration-300 group-hover:text-white" /> {/* Icon with hover effect */}
            Statistics
          </Link>
          <Link
            to="/login"
            className="group block mt-4 md:inline-block md:mt-0 text-green-100 hover:text-white mr-4
                       px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                       hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75
                       flex items-center justify-center md:justify-start"
          >
            <LogIn size={20} className="mr-2 transition-colors duration-300 group-hover:text-white" />
            Login
          </Link>
          <Link
            to="/search"
            className="group block mt-4 md:inline-block md:mt-0 text-green-100 hover:text-white mr-4
                       px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                       hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75
                       flex items-center justify-center md:justify-start"
          >
            <Search size={20} className="mr-2 transition-colors duration-300 group-hover:text-white" />
            Search Items
          </Link>
          <Link
            to="/find"
            className="group block mt-4 md:inline-block md:mt-0 text-green-100 hover:text-white mr-4
                       px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                       hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75
                       flex items-center justify-center md:justify-start"
          >
            <MapPin size={20} className="mr-2 transition-colors duration-300 group-hover:text-white" />
            Current Collections
          </Link>
          <Link
            to="/profile"
            className="group block mt-4 md:inline-block md:mt-0 text-green-100 hover:text-white mr-4
                       px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                       hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75
                       flex items-center justify-center md:justify-start"
          >
            <User size={20} className="mr-2 transition-colors duration-300 group-hover:text-white" />
            Profile
          </Link>
          {/* Logout button styled differently for emphasis */}
          <Link
            to="/logout"
            className="group block mt-4 md:inline-block md:mt-0 text-red-100 hover:text-white
                       px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                       bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-75
                       flex items-center justify-center md:justify-start"
          >
            <LogOut size={20} className="mr-2 transition-colors duration-300 group-hover:text-white" />
            Logout
          </Link>
        </div>
       
      </div>
    </nav>
     <EwasteOverviewContent/>
    </>
   
  );
}

export default NavBar;
