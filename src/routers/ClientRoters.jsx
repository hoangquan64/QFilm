import React from 'react';

import Search from '../pages/client/search/Search';
import Main from '../pages/client/main/Main';
import { Route, Router, Routes } from 'react-router-dom';

function ClientRoters(props) {
    const routers = [
        { path: "/", components: <Main /> },
        { path: "/search", components: <Search /> },
    ];
    return (
        <div className=''>
            <Routes>
                {routers.map((router, index) => (
                    <Route key={index} path={router.path} element={router.components} />
                ))}
            </Routes>
        </div>
    );
}

export default ClientRoters;