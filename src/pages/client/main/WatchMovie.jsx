import { useEffect, useRef } from "react";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function WatchMovie() {
    const videoRef = useRef(null);

    const episodes = Array.from({ length: 20 }, (_, i) => i + 1);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, []);

    return (
        <div className="bg-[#0f172a] min-h-screen text-white">

            {/* Header */}
            <div className="flex items-center gap-4 p-4 bg-[#111827] shadow">
                <Link to="/" className="flex items-center gap-2 text-sm hover:text-blue-400">
                    <FaArrowLeft />
                    Quay lại
                </Link>
                <h1 className="text-lg font-bold truncate">
                    Đấu Phá Thương Khung - Tập 1
                </h1>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Video Player */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="relative bg-black rounded-xl overflow-hidden shadow-lg">

                        <video
                            ref={videoRef}
                            controls
                            className="w-full aspect-video bg-black"
                            poster="https://img.youtube.com/vi/6ZfuNTqbHE8/maxresdefault.jpg"
                        >
                            <source
                                src="https://www.w3schools.com/html/mov_bbb.mp4"
                                type="video/mp4"
                            />
                        </video>

                        {/* Overlay khi loading */}
                        <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg text-xs">
                            HD • Vietsub
                        </div>
                    </div>

                    {/* Thông tin phim */}
                    <div className="bg-[#1f2937] p-5 rounded-xl shadow">
                        <h2 className="text-xl font-bold">
                            Đấu Phá Thương Khung
                        </h2>

                        <p className="text-gray-300 mt-2 leading-relaxed text-sm">
                            Thiếu niên bị phế võ công, từ đáy xã hội vươn lên đỉnh cao, 
                            từng bước chinh phục thế giới đấu khí đầy tàn khốc.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-4 text-sm">
                            <span className="bg-blue-600 px-3 py-1 rounded-full">Hoạt hình</span>
                            <span className="bg-green-600 px-3 py-1 rounded-full">Tu Tiên</span>
                            <span className="bg-purple-600 px-3 py-1 rounded-full">Full HD</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Danh sách tập */}
                <div className="bg-[#1f2937] p-5 rounded-xl shadow h-fit">
                    <h3 className="text-lg font-semibold mb-4">
                        Danh sách tập
                    </h3>

                    <div className="grid grid-cols-5 gap-2 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-700">
                        {episodes.map((ep) => (
                            <button
                                key={ep}
                                className={`
                                    py-2 rounded text-sm font-medium transition 
                                    ${ep === 1 
                                      ? "bg-blue-600 hover:bg-blue-700" 
                                      : "bg-gray-700 hover:bg-gray-600"}
                                `}
                            >
                                Tập {ep}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
