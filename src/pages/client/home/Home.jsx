import React, { useState } from 'react';
import Footer from '../footer/Footer';
import ModalRegister from '../auth/ModalRegister';
import ModalLogin from '../auth/ModalLogin';
import Header from '../../../components/client/Header';
import Main from '../main/Main';
import Detail from '../detail/Detail';
import HeaderAdmin from '../../../components/admin/HeaderAdmin';
import ClientRoters from '../../../routers/ClientRoters';


function Home(props) {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const handleCloseRegister = ()  => {
         setOpenRegister(false);
    }
    const handleOpenRegister = () => {
         setOpenRegister(true);
         setOpenLogin(false);
    }
    const handleCloseLogin  = () =>{
        setOpenLogin(false);
    }
    const handleOpenLogin =()=>{
        console.log("vvv");
        
        setOpenLogin(true);
        setOpenRegister(false);
    }
    
    return (
        <div>
            <Header handleOpenLogin={handleOpenLogin} handleOpenRegister={handleOpenRegister} />   
            <ClientRoters />
            <Footer />
            <ModalRegister handleOpenLogin ={handleOpenLogin}   openRegister={openRegister} handleCloseRegister={handleCloseRegister}/>
            <ModalLogin openLogin={openLogin} handleCloseLogin={handleCloseLogin} handleOpenRegister={handleOpenRegister} />
        </div>
    );
}

export default Home;