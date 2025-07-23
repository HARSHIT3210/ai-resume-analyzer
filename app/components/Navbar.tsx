import React from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import FlipLink from "./ui/text-effect-flipper";

const Navbar = () => {
  return (
    <nav className="navbar border border-green-600">
      <div>
        <FlipLink href={"/"} >resulyzer</FlipLink>
      </div>
      <div className="flex flex-row gap-4">
        <Link to={"/wipe"}>
          <Button
            size={"sm"}
            className="w-full bg-green-400 border-green-800 border cursor-pointer font-semibold hover:bg-green-500 text-gray-800 text-xs"
          >
            Wipe Data
          </Button>
        </Link>
        <Link to={"/upload"}>
          <Button
            size={"sm"}
            className="w-full bg-green-400 border-green-800 border cursor-pointer font-semibold hover:bg-green-500 text-gray-800 text-xs"
          >
            Upload Resume
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
