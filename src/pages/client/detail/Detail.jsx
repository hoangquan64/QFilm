import React, { useState } from "react";
import { FaPlay, FaHeart, FaShareAlt, FaCommentAlt } from "react-icons/fa";
import { AiFillStar, AiOutlineShareAlt } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";

export default function MovieDetail() {
  const [activeTab, setActiveTab] = useState("episodes");

  // ================== COMMENT STATE ==================
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      rating: 5,
      content: "Phim cực cuốn, kỹ xảo đẹp!",
      time: "2 giờ trước",
    },
  ]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const addComment = () => {
    if (!name || !comment || rating === 0) return;

    const newCmt = {
      id: Date.now(),
      name,
      rating,
      content: comment,
      time: "Vừa xong",
    };

    setComments([newCmt, ...comments]);

    setName("");
    setComment("");
    setRating(0);
  };

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen">

      {/* Banner */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <img
          src="data:image/jpeg;base64,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"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]"></div>
      </div>

      {/* Movie Info */}
      <div className=" max-w-8xl  mx-auto px-4 mt-20 mb-30 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="relative  z-10 md:col-span-1">
          <div className="flex-col md:flex-row gap-6">

            {/* Poster */}
            <div className="w-[200px] shrink-0">
              <img
                src="data:image/jpeg;base64,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"
                className="w-full rounded-xl shadow-xl border border-gray-700"
              />
            </div>

            {/* Info Right */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Tên phim - Movie Title</h1>

              <div className="flex items-center gap-3 text-gray-300 mb-4">
                <span className="flex items-center gap-1 text-yellow-400">
                  <AiFillStar className="text-xl" /> 8.7
                </span>
                <span>| 2024</span>
                <span>| 16+ | 45 phút</span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed efficitur massa vel nunc pretium, vel gravida nisi cursus.
              </p>
              <div class=" flex-wrap gap-2 grid grid-cols-3 ">
                <button class=" px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-500 transition">
                  16+
                </button>
                <button class="px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-500 transition">
                  2025
                </button>
                <button class="px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-500 transition">
                  Phần 1
                </button>
                <button class="px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-500 transition">
                  Tập 12
                </button>
                <button class="px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-500 transition">
                  Chính Kịch
                </button>
                <button class="px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-500 transition">
                  Cổ Trang
                </button>
                <button class="px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-500 transition">
                  Hài
                </button>
                <button class="px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-500 transition">
                  Lãng Mạn
                </button>
                <button class="px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-500 transition">
                  Phiêu Lưu
                </button>
                <button class="px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-500 transition">
                  Giả Tưởng
                </button>
              </div>


              {/* Buttons */}

            </div>
          </div>
        </div>
        <div className=" md:col-span-2">
          <div className="  flex items-center gap-3">

            <button className="flex items-center gap-2 bg-red-600 px-5 py-2 rounded-lg text-white font-medium hover:bg-red-700 transition">
              <FaPlay /> Xem ngay
            </button>

            <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg  hover:bg-gray-700 transition">
              <FaHeart className="text-2xl" />
              <span className="text-sm">Yêu thích</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg  hover:bg-gray-700 transition">
              <IoAdd className="text-2xl" />
              <span className="text-sm">Them vao</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg  hover:bg-gray-700 transition">
              <AiOutlineShareAlt className="text-2xl" />
              <span className="text-sm">Chia se</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg  hover:bg-gray-700 transition">
              <FaCommentAlt className="text-2xl" />
              <span className="text-sm">Binh Luan</span>
            </button>

          </div>


          <div className=" mx-auto px-4 mt-10">

            {/* TABS */}
            <div className="flex gap-6 border-b border-gray-700 pb-2">
              {[
                { key: "episodes", label: "Tập phim" },
                { key: "gallery", label: "Gallery" },
                { key: "cast", label: "Cast" },
                { key: "recommend", label: "Gợi ý" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-2 capitalize ${activeTab === tab.key
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* CONTENT */}
            <div className="mt-6">

              {/* EPISODES */}
              {activeTab === "episodes" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-800 rounded-xl hover:scale-105 transition overflow-hidden"
                    >
                      <div className="p-3 text-sm">Tập {i + 1}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* GALLERY */}
              {activeTab === "gallery" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <img
                      key={i}
                      src="/gallery.jpg"
                      className="rounded-xl h-[140px] object-cover hover:opacity-80 transition"
                    />
                  ))}
                </div>
              )}

              {/* CAST */}
              {activeTab === "cast" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <img
                        src="/actor.jpg"
                        className="w-full h-[180px] object-cover rounded-xl"
                      />
                      <p className="mt-2 text-lg font-medium">Actor Name</p>
                      <p className="text-sm text-gray-400">Character Name</p>
                    </div>
                  ))}
                </div>
              )}

              {/* RECOMMEND */}
              {activeTab === "recommend" && (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="hover:scale-105 transition">
                      <img
                        src="/poster.jpg"
                        className="w-full rounded-xl object-cover"
                      />
                      <p className="mt-2 text-sm">Movie {i + 1}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>


      </div>



      {/* Tabs */}

      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="flex gap-6 border-b border-gray-700 pb-2">
          {["Tap phim", "gallery", "cast", "recommend"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize pb-2 ${activeTab === tab
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-400 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="mt-6">
          {activeTab === "episodes" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition"
                >

                  <div className="p-3 text-sm">Tập {i + 1}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(6)].map((_, i) => (
                <img
                  key={i}
                  src="/gallery.jpg"
                  className="rounded-xl h-[140px] object-cover hover:opacity-80 transition"
                />
              ))}
            </div>
          )}

          {activeTab === "cast" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <img
                    src="/actor.jpg"
                    className="w-full h-[180px] object-cover rounded-xl"
                  />
                  <p className="mt-2 text-lg font-medium">Actor Name</p>
                  <p className="text-sm text-gray-400">Character Name</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "recommend" && (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="hover:scale-105 transition">
                  <img
                    src="/poster.jpg"
                    className="w-full rounded-xl object-cover"
                  />
                  <p className="mt-2 text-sm">Movie {i + 1}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================== COMMENT SECTION (2 COLUMN GRID) ================== */}
      <div className=" mx-auto px-4 mt-14 mb-20 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT — TOP PHIM TUẦN NÀY */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4">🔥 Top phim tuần này</h2>

          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex gap-3 bg-gray-800 p-3 rounded-xl hover:bg-gray-700 transition"
              >
                <img
                  src="/poster.jpg"
                  className="w-[70px] h-[100px] object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">Movie {item}</p>
                  <p className="text-sm text-yellow-400 flex items-center gap-1">
                    <AiFillStar /> 8.{item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — COMMENT & RATING */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">💬 Bình luận & Đánh giá</h2>

          {/* Comment Form */}
          <div className="bg-gray-800 p-5 rounded-xl mb-6">
            <input
              type="text"
              placeholder="Tên của bạn..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-gray-700 outline-none"
            />

            <textarea
              placeholder="Viết bình luận..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 h-[100px] rounded bg-gray-700 outline-none mb-3"
            />

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <AiFillStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-500"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={addComment}
              className="bg-red-600 w-full py-2 rounded-lg font-medium hover:bg-red-700 transition"
            >
              Gửi bình luận
            </button>
          </div>

          {/* Comment List */}
          <div className="flex flex-col gap-4">
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between">
                  <p className="font-bold">{c.name}</p>
                  <p className="text-sm text-gray-400">{c.time}</p>
                </div>

                <div className="flex gap-1 my-1">
                  {[...Array(c.rating)].map((_, i) => (
                    <AiFillStar key={i} className="text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-300 mt-1">{c.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
