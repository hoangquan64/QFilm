import React, { useContext, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { FaHeart } from 'react-icons/fa';
import { IoMdArrowDroprightCircle, IoMdInformationCircle } from 'react-icons/io';
import { MovieContext } from '../../../contexts/MovieProvider';

export default function App() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
   const movies = useContext(MovieContext);
   console.log(movies);
   
    return (
        <div className='relative  h-[80vh]'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 h-full"
            >
                {movies.map((e,index) => (
                         <SwiperSlide className="relative">
                    <div className="absolute top-30 left-4 bg-opacity-60 text-white p-4 rounded max-w-md">
                        {/* Tiêu đề */}
                        <h1 className="text-xl text-white font-bold">{e.name}</h1>
                        <p className="text-sm mt-1">Khởi chiếu 2025 • IMDb 7.5</p>

                        {/* Các nút thể loại */}
                        <div className="mt-3 flex flex-wrap gap-2">
                            <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded">Hành Động</button>
                            <button className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded">Chiếu Rạp</button>
                            <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded">Gay Cấn</button>
                            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">Khoa Học</button>
                            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded">Phiêu Lưu</button>
                        </div>

                        {/* Mô tả */}
                        <p className="mt-4 text-sm leading-relaxed">
                            Trong tương lai, trên một hành tinh hẻo lánh, một Predator non nớt – bị chính tộc của mình ruồng bỏ –
                            tìm thấy một đồng minh bất ngờ là Thia và bắt đầu hành trình sinh tử nhằm truy tìm kẻ thù tối thượng.
                        </p>
                        <div className='mt-5 flex gap-5 items-center'>
                            <IoMdArrowDroprightCircle className='text-8xl text-amber-300' />

                            <div>
                                <button className='text-3xl py-3 px-5 rounded-tl-full rounded-bl-full border border-amber-50' ><FaHeart /></button>
                                <button className='text-3xl py-3 px-5 rounded-tr-full rounded-br-full border border-amber-50'><IoMdInformationCircle /></button>
                            </div>
                        </div>
                    </div>

                    {/* Hình nền */}
                    <img
                        src={e.imgUrl} alt=""
                        className="w-full h-auto"
                    />
                </SwiperSlide>
                ))};
           

            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {movies.map((element,index)=>(
                         <SwiperSlide>
                            <img src={element.imgUrl} alt="" />
                </SwiperSlide>

                ))};
           
           
            </Swiper>
        </div>
    );
}
