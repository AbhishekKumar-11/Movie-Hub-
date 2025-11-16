"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    router.push(`/?search=${searchQuery}`);
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Movie-app
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 rounded-l-lg text-black bg-amber-50 outline-none w-60"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gray-700 rounded-r-lg hover:bg-gray-600"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu (with new beautiful search bar) */}
      <div
        className={`md:hidden bg-gray-800 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-52" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3">

          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col gap-3">

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full px-4 py-3 rounded-xl text-black bg-amber-50
                         shadow-md focus:ring-2 focus:ring-amber-400 outline-none text-lg"
            />

            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl 
                         shadow-md text-lg font-medium"
            >
              Search
            </button>

          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
