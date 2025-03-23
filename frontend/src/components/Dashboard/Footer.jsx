import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

const Footer = () => {
  return (
    <div className='px-[3vw] h-[60px] bg-white border-t border-gray-200 flex items-center justify-between'>

      {/* Logo */}
      <div className="flex text-2xl font-semibold items-center gap-1 text-gray-700">
        <VscAzure className="text-primary" />
        <p>In<span className="text-primary">F</span>inite</p>
      </div>

      {/* Copy Right */}
      <p className="text-gray-700 text-xs">All rights reserved Copyright &copy;2024 Designed By Mostafa Yassin.</p>

      {/* Social Media */}
      <div className="flex items-center justify-left text-gray-800 gap-3 text-2xl">
        <FaFacebook className="border border-gray-800 text-gray-800   rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
        <FaInstagram className="border border-gray-800  text-gray-800  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
        <FaXTwitter className="border border-gray-800 text-gray-800  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
        <FaLinkedinIn className="border border-gray-800 text-gray-800  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
      </div>
    </div>
  );
};

export default Footer;
