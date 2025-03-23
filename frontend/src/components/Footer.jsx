
import { VscAzure } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#031121] px-[3vw] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="flex flex-col sm:flex-row items-start gap-5 pt-16 pb-10">
        {/* Left Side */}
        <div className="w-full sm:w-[40%] ">
          <div className="text-3xl flex items-center gap-1 font-semibold text-gray-200 mb-5"><VscAzure className="text-primary" /><p>In<span className="text-primary">F</span>inite</p></div>
          <p className="text-gray-300 text-sm w-[80%]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
        </div>
        {/* Right Side */}
        <div className="w-full sm:w-[30%] flex sm:justify-center">
          <div>
            <p className="text-xl font-semibold text-gray-200 mb-5">Company</p>
            <ul className="flex flex-col gap-2">
              <NavLink className="text-gray-300 transition-all duration-300 hover:underline">Home</NavLink>
              <NavLink className="text-gray-300 transition-all duration-300 hover:underline">Fashion</NavLink>
              <NavLink className="text-gray-300 transition-all duration-300 hover:underline">Electronics</NavLink>
              <NavLink className="text-gray-300 transition-all duration-300 hover:underline">Video Games</NavLink>
              <NavLink className="text-gray-300 transition-all duration-300 hover:underline">Perfumes</NavLink>
              <NavLink className="text-gray-300 transition-all duration-300 hover:underline">About Us</NavLink>
            </ul>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-[30%] flex sm:justify-center">
          <div>
            <p className="text-xl font-semibold text-gray-200 mb-5">Get In Touch</p>
            <div className="text-gray-300 text-sm mb-5">
              <p>+1-234-567-890</p>
              <p>mostafayassin292@gmail.com</p>
            </div>
            <div className="flex items-center justify-left text-gray-300 gap-3 text-4xl">
              <FaFacebook className="border border-gray-300 text-gray-300   rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              <FaInstagram className="border border-gray-300  text-gray-300  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              <FaXTwitter className="border border-gray-300 text-gray-300  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
              <FaLinkedinIn className="border border-gray-300 text-gray-300  rounded-full p-[5px] cursor-pointer transition-all duration-300 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>

      {/* Copy Right */}
      <div className="border-t border-gray-600 py-3 text-center">
        <p className="text-gray-300 text-[15px]">All rights reserved Copyright &copy;2024 Designed By Mostafa Yassin.</p>
      </div>
    </footer>
  );
};

export default Footer;
