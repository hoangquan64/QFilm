import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const CountryContext = createContext();
function CountryProvider({children}) {
    const [countries,setCountries]= useState([]);
       useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("countries", (countriesList) => {
          setCountries(countriesList);
        });
    
        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
      }, []);
     
      
    return (
        <div>
            <CountryContext.Provider value={countries}>
                {children}
            </CountryContext.Provider>

            
        </div>
    );
}

export default CountryProvider;