"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <section>
        <header className="relative bg-white shadow-md">
          <nav className="container mx-auto flex items-center justify-between px-8 py-2">
            <div>
              <Image
                src="/logo/logo.png"
                alt="Logo"
                width={150}
                height={100}
                priority={true}
                className="max-w-4xl"
              />
            </div>
            <ul className="hidden xl:flex space-x-6 text-one">
              <li className="li-hover">Home</li>
              <li className="li-hover">About</li>
              <div className="relative group">
              <li className="li-hover">Publications <i className="bi bi-chevron-down text-sm"></i></li>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Journals</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Books</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Articles</li>
                </ul>
              </div>
              </div>
              <div className="relative group">
                  <li className="li-hover">Conferences <i className="bi bi-chevron-down text-sm"></i></li>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Upcoming Conferences</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Past Conferences</li>
                    </ul>
                  </div>
              </div>
              <li className="li-hover">Contact</li>
              <div className="relative group">
                  <li className="li-hover">Guidelines <i className="bi bi-chevron-down text-sm"></i></li>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Authors</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Reviewers</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Editors</li>
                    </ul>
                  </div>
              </div>
              <li className="li-hover">Services</li>
              <li className="li-hover">Resources</li>
            </ul>
            <div className="flex space-x-4 text-one">
              <button className="flex bg-blue-600 text-white btn hover:bg-blue-800 duration-500">
                Login
              </button>
              <button className="hidden xl:flex bg-orange-600 text-white btn hover:bg-orange-800 duration-500">
                Submit an Article
              </button>
              <div className="cursor-pointer text-black" onClick={toggleMenu}>
                {isMenuOpen ? (
                  <i className="bi bi-x-lg text-2xl xl:hidden"></i>
                ) : (
                  <i className="bi bi-list text-2xl xl:hidden"></i>
                )}
              </div>
            </div>
          </nav>
        </header>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
  {isMenuOpen && (
    <motion.div
      className="xl:hidden absolute right-0 w-full bg-white shadow-lg z-50 overflow-hidden"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <ul className="grid grid-cols-2 gap-2 p-8 text-gray-800 text-center font-medium">
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          Home
        </li>
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          About
        </li>
        <div className="relative group">
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          Publications <i className="bi bi-chevron-down text-sm"></i>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            {/* Dropdown content can be added here if needed */}
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Journals</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Books</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Articles</li>
            </ul>
          </div>
        </li>
        </div>
        <div className="relative group">
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          Conferences <i className="bi bi-chevron-down text-sm"></i>
        </li>
        <div className="absolute top-9 right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          {/* Dropdown content can be added here if needed */}
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Upcoming Conferences</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Past Conferences</li>
          </ul>
        </div>
        </div>
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          Contact
        </li>
        <div className="relative group">
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          Guidelines <i className="bi bi-chevron-down text-sm"></i>
        </li>
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          {/* Dropdown content can be added here if needed */}
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Authors</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Reviewers</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Editors</li>
          </ul>
        </div>
        </div>
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          Services
        </li>
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          Resources
        </li>

        {/* CTA Button */}
        <li className="col-span-2 flex justify-center">
          <button
            className="bg-orange-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-700 hover:scale-105 transition duration-500 shadow-md"
            onClick={toggleMenu}
          >
            Submit an Article
          </button>
        </li>
      </ul>
    </motion.div>
  )}
</AnimatePresence>

      </section>
    </>
  );
};
