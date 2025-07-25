import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import FlipLink from "./ui/text-effect-flipper";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = usePuterStore();

  return (
    <nav className="navbar relative">
      {/* Logo */}
      <div>
        <FlipLink href={"/"}>resulyzer</FlipLink>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          className="text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FaTimes className="w-5 h-5" />
          ) : (
            <FaBars className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Nav Links */}
      <div
        className={`absolute md:static top-14 left-0 right-0 z-50 bg-white rounded-b-xl md:bg-transparent md:rounded-none md:flex md:items-center md:gap-4 p-4 md:p-0 shadow md:shadow-none transition-all duration-200 ease-in-out ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Link to={"/my-resumes"}>
            <Button
              size={"sm"}
              className="bg-[#ffd900] text-gray-800 text-xs hover:bg-yellow-400 border-amber-400 w-full md:w-auto"
            >
              My Resumes
            </Button>
          </Link>
          <Link to={"/upload"}>
            <Button
              size={"sm"}
              className="bg-[#ffd900] text-gray-800 text-xs hover:bg-yellow-400 border-amber-400 w-full md:w-auto"
            >
              Upload Resume
            </Button>
          </Link>
          <Link to={"/wipe"}>
            <Button
              size={"sm"}
              className="bg-[#ffd900] text-gray-800 text-xs hover:bg-yellow-400 border-amber-400 w-full md:w-auto"
            >
              Wipe Data
            </Button>
          </Link>
        </div>
      </div>
      <Button className="bg-[#ffd900] text-gray-800 rounded-full text-xs hover:bg-yellow-400 border-amber-400 w-full md:w-auto" onClick={auth.signOut}>Sign out</Button>
    </nav>
  );
};

export default Navbar;
