import React, { useContext, useEffect, useState } from "react";
import { FaPlay, FaHeart, FaShareAlt, FaCommentAlt } from "react-icons/fa";
import { AiFillStar, AiOutlineShareAlt } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { MovieContext } from "../../../contexts/MovieProvider";

export default function MovieDetail() {
  const [activeTab, setActiveTab] = useState("episodes");
  const movies = useContext(MovieContext);
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const selectedMovie = movies.find((m) => m.id === id);
    setMovie(selectedMovie || {});
  }, [id, movies]);
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
          src={movie?.imgUrl || ""}
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
                src={movie?.imgUrl || ""}
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
            <Link to={`/watch/${movie.id}`}>
              <button className="flex items-center gap-2 bg-red-600 px-5 py-2 rounded-lg text-white font-medium hover:bg-red-700 transition">
                <FaPlay /> Xem ngay
              </button>
            </Link>
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
