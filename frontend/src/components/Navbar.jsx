import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "Dashboard" },
    { path: "/users", label: "Users" },
    { path: "/roles", label: "Roles" },
    { path: "/permissions", label: "Permissions" },
  ];

  return (
    <nav className="relative bg-green-900 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center p-6">
        <p className="text-2xl font-semibold">RBAC Dashboard</p>

        {/* Menu Icon for Mobile */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 list-none">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="hover:text-blue-200 transition duration-300 font-medium"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed right-0 h-full w-64 bg-blue-500 transform transition-transform duration-300 ease-in-out z-30 rounded-tl-3xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col mt-4">
          <ul className="flex flex-col list-none">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block px-8 py-4 hover:bg-blue-400 transition duration-300 font-medium"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;