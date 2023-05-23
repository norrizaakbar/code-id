import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  //   useEffect(() => {
  //     console.log(location);
  //   }, [location]);

  return (
    <header className="w-full bg-gray-50 text-blue-400 body-font shadow-sm ">
      {/* :DESKTOP MENU */}
      <div className="container mx-auto flex justify-between items-center py-7 px-5">
        {/* ::Site logo and Name */}
        <Link
          to="/"
          className="flex flex-shrink-0 title-font font-medium items-center text-gray-900 md:mb-0"
        >
          <div className="flex w-10 rounded-full overflow-hidden">
            <img src="https://play-lh.googleusercontent.com/bmW78ooeOboSNnpZKGxfJgXFUfacJ5Ye7Af8MHKKoKpVMNsDXnxyExShw30nGwS55QjY" />
          </div>
          <span className="ml-3 text-2xl text-blue-500 font-semibold antialiased">
            Jenius
          </span>
        </Link>
        {/* ::Navbar */}
        <nav className="hidden md:flex flex-wrap items-center justify-center text-base tracking-wide">
          <Link
            to="/"
            className={`mr-8 hover:text-indigo-500 ${
              location.pathname === "/" ? "text-blue-500 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/add"
            className={`mr-8 hover:text-indigo-500 ${
              location.pathname === "/add" ? "text-blue-500 font-semibold" : ""
            }`}
          >
            Add Contact
          </Link>
        </nav>
        {/* ::Avatar */}
        <div className="hidden sm:inline-flex ml-auto md:ml-0 mr-4 md:mr-0 cursor-pointer"></div>
        {/* ::Burger icon standard */}
        <button
          className="md:hidden rounded-md active:outline-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 rounded-md text-gray-500 bg-gradient-to-br from-transparent to-transparent hover:text-white hover:from-purple-500 hover:to-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* ::MOBILE MENU */}
      {isOpen && (
        <div className="w-full flex flex-col py-4 px-3 md:hidden bg-gray-50 text-base uppercase text-center font-semibold ">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-blue-400 hover:text-white hover:bg-indigo-400 transition-all duration-500 ${
              location.pathname === "/" ? "bg-cyan-200 font-bold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/add"
            className={`block px-3 py-2 rounded-md text-blue-400 hover:text-white hover:bg-indigo-400 transition-all duration-500 ${
              location.pathname === "/add" ? "bg-cyan-200 font-bold" : ""
            }`}
          >
            Add Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
