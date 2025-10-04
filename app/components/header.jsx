"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { button } from "framer-motion/client";


export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggin, setIsLoggin] = useState(false)
  
  useEffect(() => {
  const checkAuth = () => setIsLoggin(!!localStorage.getItem("access_token"));
  checkAuth();
  window.addEventListener("authChange", checkAuth);
  return () => window.removeEventListener("authChange", checkAuth);
}, []);


  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);

   const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_superuser");
    setIsLoggin(false);
    router.push("/login")
  };

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
              <Link href="/">
              <li className="li-hover">Home</li>
              </Link>
              <Link href="/components/about">
              <li className="li-hover">About</li>
              </Link>
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
              <Link href="/components/contact">
              <li className="li-hover">Contact</li>
              </Link>
              <div className="relative group">
                  <li className="li-hover">Guidelines <i className="bi bi-chevron-down text-sm"></i></li>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <ul className="py-2">
                      <Link href="/guidelines/author">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Authors</li>
                      </Link>
                      <Link href="/guidelines/reviewers">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Reviewers</li>
                      </Link>
                      <Link href="/guidelines/editors">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Editors</li>
                      </Link>
                    </ul>
                  </div>
              </div>
              <Link href="/components/services">
              <li className="li-hover">Services</li>
              </Link>
              <Link href="/components/resources">
              <li className="li-hover">Resources</li>
              </Link>
            </ul>
            <div className="flex space-x-4 text-one">

              {isLoggin ? (
      <button className="flex bg-blue-600 text-white btn hover:bg-blue-800 duration-500"
      onClick={handleLogout}>
        Logout
      </button>
    ) : (<Link href={"/login"}>
              <button className="flex bg-blue-600 text-white btn hover:bg-blue-800 duration-500">
                Login
              </button>
              </Link>)}
              
              
              <Link href="/publications/create">
              <button className="hidden xl:flex bg-orange-600 text-white btn hover:bg-orange-800 duration-500">
                Submit an Article
              </button>
              </Link>
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
        <Link href="/">
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
        >
          Home
        </li>
        </Link>
        <Link href="/components/about">
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
        >
          About
        </li>
        </Link>
        <div className="relative group">
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
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
        <Link href="/components/contact">
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          Contact
        </li>
        </Link>
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
            <Link href="/guidelines/author">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Authors</li>
            </Link>
            <Link href="/guidelines/reviewers">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Reviewers</li>
            </Link>
            <Link href="/guidelines/editors">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">For Editors</li>
            </Link>
          </ul>
        </div>
        </div>
        <Link href="/components/services">
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          Services
        </li>
        </Link>
        <Link href="/components/resources">
        <li
          className="flex items-center justify-center gap-2 hover:bg-blue-100 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={toggleMenu}
        >
          Resources
        </li>
        </Link>

        {/* CTA Button */}
        <li className="col-span-2 flex justify-center">
          <Link href="/publications/create">
          <button
            className="bg-orange-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-700 hover:scale-105 transition duration-500 shadow-md"
            onClick={toggleMenu}
          >
            Submit an Article
          </button>
          </Link>
        </li>
      </ul>
    </motion.div>
  )}
</AnimatePresence>

      </section>
    </>
  );
};
