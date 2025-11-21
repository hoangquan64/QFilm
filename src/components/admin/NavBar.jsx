import React from 'react';
import { VscThreeBars } from "react-icons/vsc";
import { AiFillLayout } from "react-icons/ai";
import { IoMdArrowDroprightCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { FaImage, FaUser } from "react-icons/fa";
import { RiFileUserFill } from 'react-icons/ri';
import { HiUserGroup } from 'react-icons/hi';
import { GiGlowingHands } from 'react-icons/gi';
import { MdCast } from 'react-icons/md';
import { listMenu } from '../../untils/Contanst';
import { Link } from 'react-router-dom';



function NavBar(props) {
  const [isOpen, setIsOpen] = React.useState(null);
  const [show, setShow] = React.useState(false);

  const handdleClick = (index) => {
    isOpen == index ? setIsOpen(null) : setIsOpen(index);
  }

  return (
    <div className='p-4 bg-gray-800 text-white min-md:h-screen  ' >
      <div className='flex justify-center gap-2 items-center text-2xl font-extrabold cursor-pointer select-none'> <VscThreeBars onClick={() => setShow(!show)} className="text-white hover:text-cyan-400 transition-colors duration-300" /> {show && (<h1 className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] transition-all duration-300"> Qfilm <span className='text-yellow-400'>Admin</span> </h1>)} </div>
      <div className={!show ? "max-md:hidden" : ""}>
        <div className="group relative flex items-center gap-3 cursor-pointer list-none 
                text-white text-lg font-medium rounded-xl px-4 py-2
                bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-700
                shadow-[0_0_10px_rgba(100,160,255,0.4)]
                hover:shadow-[0_0_25px_rgba(150,100,255,0.8)]
                hover:scale-105 transition-all duration-300 overflow-hidden mt-3">

          {/* 💫 Hiệu ứng ánh sáng băng qua khi hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  translate-x-[-150%] group-hover:translate-x-[150%]
                  transition-transform duration-700 ease-in-out skew-x-12"></span>

          {/* 🌟 Icon + chữ */}
          <AiFillLayout className="relative z-10" />
          {show && <li className="relative z-10">Dashboard</li>}
        </div>

        {show && <h1>From and data</h1>}
        {listMenu.map((element, index) => (
          <div key={index} className="relative">

            {/* Nút chính */}
            <div
              onClick={() => handdleClick(index)}
              className={`
        relative flex gap-2 items-center text-lg font-medium cursor-pointer px-4 py-2 rounded-xl
        transition-all duration-300 mt-2 mb-3
        ${isOpen === index
                  ? 'bg-gradient-to-r from-cyan-700 via-indigo-700 to-purple-800 text-white shadow-[0_4px_20px_rgba(100,120,255,0.4)] scale-105'
                  : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-700 text-white shadow-[0_2px_12px_rgba(80,100,200,0.3)]'}
      `}
            >
              <span className="relative z-10 flex gap-2 items-center">
                {element.icon}
                {show && <span>{element.name}</span>}
              </span>

              {isOpen === index
                ? <IoMdArrowDropupCircle className="ml-auto relative z-10 rotate-180" />
                : <IoMdArrowDroprightCircle className="ml-auto relative z-10" />}
            </div>

            {/* Sub-menu */}
            {isOpen === index && (
              <ul className={`${!show ? "absolute z-100 -right-4 top-0 translate-x-full" : "mt-2 space-y-2"}`}>
                {element.items.map((item, subIndex) => (
                  <Link
                    key={subIndex}
                    to={item.path}
                    className=" mt-1
  relative group flex items-center gap-2 cursor-pointer list-none px-5 py-2.5 rounded-2xl
  bg-gradient-to-r from-[#B5E8FF] via-[#E5C0FF] to-[#FFD6E0]
  text-gray-900 font-semibold tracking-wide
  shadow-[0_8px_25px_rgba(170,130,255,0.35),_inset_0_2px_3px_rgba(255,255,255,0.6)]
  hover:shadow-[0_12px_40px_rgba(150,100,255,0.55),_inset_0_3px_4px_rgba(255,255,255,0.7)]
  hover:scale-105 hover:brightness-125
  transition-all duration-300 ease-out backdrop-blur-md
">
                    <span className="relative z-10">{item.title}</span>
                  </Link>
                ))}
              </ul>
            )}

          </div>
        ))}
        {show && <h1>Pages</h1>}
        <div className="space-y-3 mt-3">
          {/* 🌌 User Pages */}
          <div className="group relative flex items-center gap-3 cursor-pointer list-none 
                  text-white text-lg font-medium rounded-xl px-4 py-2
                  bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-700
                  shadow-[0_0_10px_rgba(120,180,255,0.4)]
                  hover:shadow-[0_0_25px_rgba(160,120,255,0.8)]
                  hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    translate-x-[-150%] group-hover:translate-x-[150%]
                    transition-transform duration-700 ease-in-out skew-x-12"></span>
            <FaUser className="relative z-10" />
            {show && <h1 className="relative z-10">User Pages</h1>}
          </div>
          {/* 🌌 User Management */}
          <div className="group relative flex items-center gap-3 cursor-pointer list-none 
                  text-white text-lg font-medium rounded-xl px-4 py-2
                  bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700
                  shadow-[0_0_10px_rgba(100,160,255,0.4)]
                  hover:shadow-[0_0_25px_rgba(150,100,255,0.8)]
                  hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    translate-x-[-150%] group-hover:translate-x-[150%]
                    transition-transform duration-700 ease-in-out skew-x-12"></span>

            <HiUserGroup className="relative z-10" />
            {show && <h1 className="relative z-10">User Management</h1>}
          </div>

          {/* 🌌 Profile */}
          <div className="group relative flex items-center gap-3 cursor-pointer list-none 
                  text-white text-lg font-medium rounded-xl px-4 py-2
                  bg-gradient-to-r from-fuchsia-600 via-purple-700 to-indigo-700
                  shadow-[0_0_10px_rgba(150,100,255,0.5)]
                  hover:shadow-[0_0_25px_rgba(180,130,255,0.9)]
                  hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                    translate-x-[-150%] group-hover:translate-x-[150%]
                    transition-transform duration-700 ease-in-out skew-x-12"></span>

            <RiFileUserFill className="relative z-10" />
            {show && <h1 className="relative z-10">Profile</h1>}
          </div>

        </div>

      </div>
    </div>
  );
}

export default NavBar; 