import React, { useContext, useState } from 'react';
import { IoMdMail } from 'react-icons/io';
import { IoNotifications, IoSearch } from 'react-icons/io5';
import { AuthContext } from '../../contexts/AuthProvider';

function HeaderAdmin({ handleOpenLogin, handleOpenRegister }) {
   const [admin,setAdmin] = useState(false); 
   const { accLogin, logout } = useContext(AuthContext);
  const genres = [
    "Hành Động",
    "Tình Cảm",
    "Hài",
    "Kinh Dị",
    "Viễn Tưởng",
    "Hoạt Hình",
  ];
  return (
    <div className="backdrop-blur-md bg-black/20 border-b border-white/10 shadow-md">
      <div className="flex justify-between items-center p-4 text-white">
        <div>
          <h1 className="text-lg font-semibold">Hi, Quan</h1>
          <p className="text-sm opacity-80">Welcome to QFILM</p>
        </div>

        <ul className="flex items-center gap-4">
          <li className="cursor-pointer p-2 hover:bg-white/10 rounded-full">
            <IoSearch size={22} />
          </li>
          <li className="cursor-pointer p-2 hover:bg-white/10 rounded-full">
            <IoMdMail size={22} />
          </li>
          <li className="cursor-pointer p-2 hover:bg-white/10 rounded-full">
            <IoNotifications size={22} />
          </li>
         
          <div onClick={() => setAdmin(!admin)} className=" relative flex items-center gap-2 cursor-pointer">

            <img
              src="https://i.pravatar.cc/40"
              alt="user avatar"
              className="w-8 h-8 rounded-full border border-white/20"
            />
            {admin && (
              <div
                className="absolute right-0  bottom-0 translate-y-full mt-2 w-40 bg-blue-400 text-black shadow-lg rounded-lg p-2 z-50"
              >
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
                  Profile
                </button>

                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">
                  Roles
                </button>

                <button
                  className="w-full text-left px-3 py-2 hover:bg-red-100 text-red-600 rounded-md"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default HeaderAdmin;
