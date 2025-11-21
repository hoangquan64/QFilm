import { useContext, useState } from 'react'
import './App.css'
import HomeAdmin from './pages/admin/home_admin/HomeAdmin'  // 👉 Thêm dòng này
import Home from './pages/client/home/Home'
import StarField from './components/StarField'
import { AuthContext } from './contexts/AuthProvider'

function App() {
const { accLogin, logout } = useContext(AuthContext);
  return (
    <>
      {
        accLogin?.roler === "admin" ? <div className="relative">
          <StarField />
          <div className="relative z-10">
            <HomeAdmin />
          </div>
        </div> : <Home />
      }
    </>
  )
}

export default App
