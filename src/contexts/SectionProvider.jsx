import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const SectionContext = createContext();

function SectionProvider({children}) {
    const [sections , setSections] = useState([]);
    useEffect(()=>{
             // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
                const unsubscribe = fetchDocumentsRealtime("sections", (sectionList) => {
                  setSections(sectionList);
                });
            
                // Hủy lắng nghe khi component bị unmount
                return () => unsubscribe();
             
    
    
        },[])
    return (
        <SectionContext.Provider value={sections}>
            {children}
        </SectionContext.Provider>
    );
}

export default SectionProvider;