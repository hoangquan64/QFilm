import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const ChacracterContext = createContext();


function ChacracterProvider({children}) {
    const [chacracters,setChacracters]=useState([]);
       useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("chacracters", (chacractersList) => {
          setChacracters(chacractersList);
        });
    
        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
      }, []);
console.log(chacracters);
    return (
        <ChacracterContext.Provider value={chacracters}>
            {children}
        </ChacracterContext.Provider>
        
    );
}

export default ChacracterProvider;