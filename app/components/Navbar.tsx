import React from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import FlipLink from "./ui/text-effect-flipper";

const Navbar = () => {
  return (
    <nav className="navbar border border-green-600">
      <div>
        <FlipLink href={"/"}>resulyzer</FlipLink>
      </div>
      <div className="flex flex-row gap-4">
        <Link to={"/wipe"}>
          <Button
            size={"sm"}
            className="bg-[#ffd900] text-gray-800 text-xs hover:bg-yellow-400 border-amber-400"
          >
            My Resumes
          </Button>
        </Link>
        <Link to={"/wipe"}>
          <Button
            size={"sm"}
            className="bg-[#ffd900] text-gray-800 text-xs hover:bg-yellow-400  border-amber-400"
          >
            Wipe Data
          </Button>
        </Link>
        <Link to={"/upload"}>
          <Button
            size={"sm"}
            className="bg-[#ffd900] text-gray-800 text-xs hover:bg-yellow-400  border-amber-400"
          >
            Upload Resume
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
