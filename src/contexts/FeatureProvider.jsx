import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const FeatureContext = createContext();
function FeatureProvider({children}) {
    const [features ,setFeatures]=useState([]);
    useEffect(()=>{
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
           const unsubscribe = fetchDocumentsRealtime("features", (featureList) => {
             setFeatures(featureList);
           });
       
           // Hủy lắng nghe khi component bị unmount
           return () => unsubscribe();
        
   
   
       },[]);
    return (
        <FeatureContext.Provider value={features}>
            {children}
        </FeatureContext.Provider>
    );
}

export default FeatureProvider;