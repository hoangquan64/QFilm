import React from "react";
import {
  AiFillTikTok,
} from "react-icons/ai";
import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 mt-1">
      <div className=" mx-auto p-4 flex flex-col md:flex-row justify-around gap-3">

        {/* Logo & description */}
        <div className="flex flex-col gap-3 md:max-w-sm">
          <div className="text-2xl font-bold text-purple-400">QFilm</div>
          <p className="text-sm">
            Qilm– Phim hay cả rổ - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
          </p>
        </div>

        {/* Menu links */}
        <div className="flex flex-col gap-4 text-sm">
          <span className="font-semibold text-white mb-2">Menu</span>
          <ul className="flex flex-col gap-1">
            <li className="hover:text-purple-400 cursor-pointer transition">Hỏi-Đáp</li>
            <li className="hover:text-purple-400 cursor-pointer transition">Chính sách bảo mật</li>
            <li className="hover:text-purple-400 cursor-pointer transition">Điều khoản sử dụng</li>
            <li className="hover:text-purple-400 cursor-pointer transition">Giới thiệu</li>
            <li className="hover:text-purple-400 cursor-pointer transition">Liên hệ</li>
          </ul>
        </div>

        {/* Trang phim nổi bật */}
        <div className="flex flex-col gap-4 text-sm">
          <span className="font-semibold text-white mb-2">Trang Phim nổi bật</span>
          <ul className="flex flex-col gap-1">
            <li className="hover:text-purple-400 cursor-pointer transition">Dongphim</li>
            <li className="hover:text-purple-400 cursor-pointer transition">Ghienphim</li>
            <li className="hover:text-purple-400 cursor-pointer transition">Motphim</li>
            <li className="hover:text-purple-400 cursor-pointer transition">Subnhanh</li>
            <li className="hover:text-purple-400 cursor-pointer transition">RoPhim</li>
            <li className="hover:text-purple-400 cursor-pointer transition">Phimmoi.net</li>
            <li className="hover:text-purple-400 cursor-pointer transition">HDOnline</li>
          </ul>
        </div>

        {/* Social icons */}
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-white mb-2">Kết nối với chúng tôi</span>
          <div className="flex items-center gap-3 text-xl text-gray-300">
            <FaTelegram className="hover:text-purple-400 cursor-pointer transition" />
            <FaInstagramSquare className="hover:text-purple-400 cursor-pointer transition" />
            <FaDiscord className="hover:text-purple-400 cursor-pointer transition" />
            <FaFacebookSquare className="hover:text-purple-400 cursor-pointer transition" />
            <AiFillTikTok className="hover:text-purple-400 cursor-pointer transition" />
            <FaYoutube className="hover:text-purple-400 cursor-pointer transition" />
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © 2024 QFiLm – Tập hợp dữ liệu từ Dongphim, Ghienphim, Motphim, Subnhanh, RoPhim, Phimmoi.net, HDOnline. 
        Phát triển bởi Team QFiLm. Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD.
      </div>
    </footer>
  );
}

export default Footer;
