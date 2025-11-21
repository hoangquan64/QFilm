import React, { useContext, useState } from "react";
import { FaHeart, FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { VscThreeBars } from "react-icons/vsc";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { GrAdd } from "react-icons/gr";
import { FaClockRotateLeft } from "react-icons/fa6";
import { AuthContext } from "../../contexts/AuthProvider";
import { MdPayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
  const genres = [
    "Hành Động",
    "Tình Cảm",
    "Hài",
    "Kinh Dị",
    "Viễn Tưởng",
    "Hoạt Hình",
  ];


  const countries = [
    "Việt Nam",
    "Mỹ",
    "Hàn Quốc",
    "Trung Quốc",
    "Nhật Bản",
    "Ấn Độ",
    "Pháp",
    "Anh",
  ];

function Header({ handleOpenLogin, handleOpenRegister }) {
  const [show, setShow] = useState(false);
  const [serach, setSearch] = useState(false);
  const [openMenuList, setOpenMenuList] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [user, setUser] = useState(false);
  const { accLogin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (

    <>
      {/* Header fixed top-0 left-0 z-50 */}
      <div className="fixed w-full text-white px-6 py-3 
                      flex items-center justify-between shadow-lg z-100
                      ">
        {/* Logo */}
        <div className="min-md:hidden">
          {show ? <VscThreeBars onClick={() => setShow(false)} /> : <IoCloseSharp className="text-red-600 text-xl" onClick={() => setShow(true)} />}
        </div>
        <div>
          <div onClick={() => navigate("/")} className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-wider uppercase drop-shadow-lg">
            QFILM
          </div>

          <p className="text-gray-400 text-sm max-md:hidden">Phim hay mọi thời đại</p>
        </div>

        {/* Search */}
        <div className={`min-md:w-md max-md:w-full left-0 max-md:absolute z-10 bg-white h-11 px-3 py-2 rounded-md border border-transparent flex items-center ${serach ? "" : "max-md:hidden"}`}>
          <IoIosSearch className="text-gray-600 " />
          <input
            type="text"
            placeholder="Tìm kiếm phim, diễn viên..."
            className="w-full bg-transparent text-black placeholder-gray-400 outline-none text-sm gap-2"
          />
          <IoCloseSharp className="text-red-600 text-2xl min-md:hidden" onClick={() => setSearch(false)} />
        </div>

        {/* Menu */}


        <ul className={`max-md:grid max-md:grid-cols-2 p-2 min-md:gap-2 min-md:flex text-sm font-medium max-md:absolute rounded-md max-md:bg-black max-md:p-2 max-md:left-0  max-md:bottom-0 max-md:translate-y-full ${show ? "max-md:hidden" : ""}`}>

          {accLogin ? <div onClick={() => setUser(!user)} className=" relative min-md:order-1 flex items-center gap-2 cursor-pointer">

            <img
              src="https://i.pravatar.cc/40"
              alt="user avatar"
              className=" w-8 h-8 rounded-full border border-white/20"
            />
            {user && (
              <div
                className="rounded-xl absolute right-0 bottom-0 translate-y-full mt-2  w-64 bg-gray-900 text-white  shadow-xl p-4 z-50 backdrop-blur-sm animate-fadeIn">
                {/* User info */}
                <div className="pb-3 border-b border-gray-700">
                  <h1 className="text-lg font-semibold">
                    {user.name || "Hoàng Quân"}
                  </h1>
                  <p className="text-xs text-gray-400 mt-1">
                    Nâng cấp tài khoản QFILM để trải nghiệm đẳng cấp hơn
                  </p>

                  <button className=" mt-2 w-full py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600  hover:from-purple-700 hover:to-pink-700  rounded-lg transition shadow-md ">
                    Nâng cấp ngay
                  </button>
                </div>

                {/* Balance */}
                <div className="py-3 border-b border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MdPayments size={18} />
                    <span className="text-sm">Số dư: <strong>0</strong></span>
                  </div>

                  <button
                    className=" flex items-center gap-1 text-sm px-3 py-1  bg-[#242424] hover:bg-[#333]  rounded-lg border border-gray-700 transition">
                    <GrAdd size={14} /> Nạp
                  </button>
                </div>

                {/* Menu Items */}
                <div >
                  <button className="flex gap-2 items-center w-full text-left px-3 py-2 rounded-md hover:bg-[#242424] transition">
                    <GrAdd /> Danh sách
                  </button>

                  <button className="flex gap-2 items-center w-full text-left px-3 py-2 rounded-md hover:bg-[#242424] transition">
                    <FaClockRotateLeft /> Xem tiếp
                  </button>

                  <button className="flex gap-2 items-center w-full text-left px-3 py-2 rounded-md hover:bg-[#242424] transition">
                    <FaHeart /> Yêu thích
                  </button>

                  <button className=" flex gap-2 items-center w-full text-left px-3 py-2 rounded-md hover:bg-[#242424] transition">
                    <FaUser /> Tài khoản
                  </button>
                </div>

                {/* Logout */}
                <button
                  onClick={logout}
                  className=" flex items-center gap-2 mt-2 w-full text-left px-3 py-2 rounded-md text-white hover:bg-[#242424] transition" >
                  <FaSignOutAlt /> Đăng xuất
                </button>
              </div>
            )}
          </div> : <div
            onClick={handleOpenLogin}
            className="flex min-md:order-1 justify-center  items-center gap-2 cursor-pointer col-span-2 bg-amber-300/20 py-2 px-6 rounded-[45px]"
          >
            <FaUser className="text-white" />
            <span className="font-medium">Thành viên</span>
          </div>
          }
          <li className="hover:text-purple-400 cursor-pointer items-center  transition col-span-1 p-2">Phim Bộ</li>
          <li className="hover:text-purple-400 cursor-pointer items-center  transition col-span-1 p-2">Phim Lẻ</li>
          <li onClick={() => { setOpenMenuList(!openMenuList); setOpenCountry(false); }} className=" relative cursor-pointer transition flex  items-center gap-1 col-span-1 p-2">
            Thể Loại <AiFillCaretDown />

            {openMenuList && (
              <div className="absolute top-full max-md:mt-0 left-0 right-3 mt-5 w-100 bg-gray-900 text-white rounded-md shadow-lg z-50 p-2 text-xs">
                <ul className="grid grid-cols-4 max-md:grid-cols-3 gap-1">
                  {genres.map((genre, index) => (
                    <li
                      key={index}
                      className="px-2 py-1 hover:bg-gray-400 rounded cursor-pointer transition  min-md:text-center text-xs "
                    >
                      {genre}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          <li onClick={() => { setOpenCountry(!openCountry); setOpenMenuList(false); }} className=" relative cursor-pointer transition flex items-center gap-1 col-span-1 p-2 ">
            Quốc Gia <AiFillCaretDown />
            {openCountry && (
              <div className="absolute max-md:mt-0 top-full left-0 mt-5 w-30 bg-gray-900 text-white rounded-md shadow-lg z-50 p-2 text-xs">
                <ul className="grid grid-cols-1 gap-1">
                  {countries.map((country, index) => (
                    <li
                      key={index}
                      className="px-2 py-2 hover:bg-purple-600 rounded cursor-pointer transition  whitespace-nowrap "
                    >
                      {country}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          <li className="hover:text-purple-400 cursor-pointer transition col-span-1 p-2 ">Xem Chung</li>
          <li className="hover:text-purple-400 cursor-pointer  transition col-span-1 p-2">Thêm</li>
        </ul>



        <FaSearch className="text-white min-md:hidden" onClick={() => setSearch(true)} />
        {/* User */}
      </div>


      {/* Modal Login/Register */}

    </>
  );
}

export default Header;
