import React from "react";
import NavBar from "../../../components/admin/NavBar";
import HeaderAdmin from "../../../components/admin/HeaderAdmin";
import AdminRouters from "../../../routers/AdminRouters";
import StarField from "../../../components/StarField"; // 🌌 import

function HomeAdmin() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* 🧭 Thanh bên trái (NavBar) giữ nguyên */}
      <NavBar />

      {/* 🌌 Phần bên phải (Header + nội dung) có nền vũ trụ */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* 🌠 Nền vũ trụ phủ toàn bộ vùng phải */}
        <StarField />

        {/* 📌 HeaderAdmin */}
        <div className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10 shadow-sm">
          <HeaderAdmin />
        </div>

        {/* 📋 Nội dung router */}
        <div className="flex-1 overflow-auto p-4 relative z-10 bg-transparent backdrop-blur-sm">
          <AdminRouters />
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
