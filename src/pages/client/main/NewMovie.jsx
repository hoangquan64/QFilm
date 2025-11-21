// MovieCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { MdArrowForwardIos, MdOutlineArrowBackIos, MdOutlineKeyboardArrowRight } from "react-icons/md";
import GradientText from "./GradientText";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function NewMovie({ data, title }) {

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="">
            <div className="flex gap-4 relative flex-col md:flex-row ">
                <div className="w-[200px] flex flex-row md:flex-col items-center md:items-start justify-around md:justify-around gap-4">
                    <GradientText
                        animationSpeed={0.5}
                        showBorder={false}
                        className="custom-class text-lg md:text-xl lg:text-2xl"
                    >
                        Phim {title} mới
                    </GradientText>

                    <button className="text-sm text-gray-400 hover:underline flex items-center">
                        <span>Xem toàn bộ</span>
                        <MdOutlineKeyboardArrowRight />
                    </button>
                </div>

                <div className="relative flex-1">

                    <Swiper
                        breakpoints={{
                            0: { slidesPerView: 2, spaceBetween: 4 },
                            480: { slidesPerView: 3, spaceBetween: 8 },
                            640: { slidesPerView: 3, spaceBetween: 8 },
                            768: { slidesPerView: 3, spaceBetween: 4 },
                            1024: { slidesPerView: 4, spaceBetween: 5 },
                            1280: { slidesPerView: 4, spaceBetween: 6 },
                        }}
                        spaceBetween={12}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        className="w-full md:w-[600px] lg:w-[1000px]"
                    >
                        {data.map((e, i) => (
                            <SwiperSlide key={i}>
                                <Link to={`/detail/${e.id}`} className="block">
                                    <div className="relative">
                                        <img
                                            src={e.imgUrl}
                                            alt={e.name}
                                            className="rounded-lg hover:scale-105 transition h-[100px] md:h-[120px] lg:h-[140px] w-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 bg-green-500/60 text-xs px-2 py-1 rounded-tr-lg text-white">
                                            {e.movieType || "Không rõ"}
                                        </div>
                                    </div>

                                    <h3 className="text-sm mt-2 text-white line-clamp-1">
                                        {e.name}
                                    </h3>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Nút Prev */}
                    <button
                        ref={prevRef}
                        className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2
                        z-30 p-2 bg-white text-black rounded-full shadow hidden md:flex"
                    >
                        <MdOutlineArrowBackIos />
                    </button>

                    {/* Nút Next */}
                    <button
                        ref={nextRef}
                        className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2
                        z-30 p-2 bg-white text-black rounded-full shadow hidden md:flex"
                    >
                        <MdArrowForwardIos />
                    </button>
                </div>
            </div>
        </div>
    );
}
