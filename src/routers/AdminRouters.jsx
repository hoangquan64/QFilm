import React from 'react';
// 🌌 Import hiệu ứng nền vũ trụ
import StarField from '../components/StarField';
import { Route, Routes } from 'react-router-dom';
import DashBoard from '../pages/admin/dasboard/DashBoard';
import Authors from '../pages/admin/cast_crew/authors/Authors';
import Chacracters from '../pages/admin/cast_crew/chacracters/Chacracters';
import Episodes from '../pages/admin/media_management/episodes/Episodes';
import Movies from '../pages/admin/media_management/movies/Movies';
import Sections from '../pages/admin/media_management/sections/Sections';
import Categories from '../pages/admin/metadata/categories/Categories';
import Countries from '../pages/admin/metadata/countries/Countries';
import Movies_type from '../pages/admin/metadata/movies_type/Movies_type';
import Actors from '../pages/admin/cast_crew/actors/Actors';
import Packages from '../pages/admin/vip/packages/Packages';
import Plans from '../pages/admin/vip/plans/Plans';
import Features from '../pages/admin/vip/features/Features';
import HomeAdmin from '../pages/admin/home_admin/HomeAdmin';



function AdminRouters() {
    const routers = [
        { path: "/", component: <DashBoard /> },
        { path: "/actors", component: <Actors /> },
        { path: "/authors", component: <Authors /> },
        { path: "/chacracters", component: <Chacracters /> },
        { path: "/home_admin", component: <HomeAdmin /> },
        { path: "/episodes", component: <Episodes /> },
        { path: "/movies", component: <Movies /> },
        { path: "/sections", component: <Sections /> },
        { path: "/categories", component: <Categories /> },
        { path: "/countries", component: <Countries /> },
        { path: "/movies_type", component: <Movies_type /> },
        { path: "/packages", component: <Packages /> },
        { path: "/plans", component: <Plans /> },
        { path: "/features", component: <Features /> },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* 🌌 Nền vũ trụ */}
            <StarField />
            {/* 🔧 Nội dung các trang admin */}
            <div className="relative z-10">
                <Routes>
                    {routers.map((router, index) => (
                        <Route key={index} path={router.path} element={router.component} />
                    ))}
                </Routes>
            </div>
        </div>
    );
}

export default AdminRouters;
