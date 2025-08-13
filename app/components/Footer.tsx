// components/Footer.tsx
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#a02020] text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg text-gray-200 font-normal">
            Resulyzer - AI-powered resume insights for better careers.
          </h3>
        </div>

        {/* Links */}
        <div className="flex md:mr-42 gap-4 text-xl">
          <a
            href="https://github.com/Harshit3210"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFD700] transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/harshit-mehta-97294a32a"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFD700] transition"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-center md:text-right text-gray-300">
          © {new Date().getFullYear()} Resulyzer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
