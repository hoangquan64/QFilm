import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(); 
function AuthProvider({ children }) {
     const [accLogin,setAccLogin] = useState(null);

useEffect(() => {
    const checkAcc = localStorage.getItem("acc");
    if(checkAcc) {
         setAccLogin(JSON.parse(checkAcc));
    }
},[]);

  const saveLogin = (acc) => {
      localStorage.setItem("acc", JSON.stringify(acc));
      setAccLogin(acc);
  }

  const logout = () => {
    localStorage.removeItem("acc");
       setAccLogin(null);
  }

    return (
        <AuthContext.Provider value={{ accLogin, saveLogin , logout }}>
              {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;