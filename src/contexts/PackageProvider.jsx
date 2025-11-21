import React, { createContext, use, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const PackageContext = createContext();
function PackageProvider({children}) {
    const [packages,setPackages] = useState([]);
    useEffect(() => {
          // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
                            const unsubscribe = fetchDocumentsRealtime("packages", (packageList) => {
                              setPackages(packageList);
                            });
                        
                            // Hủy lắng nghe khi component bị unmount
                            return () => unsubscribe();
        // Fetch packages from your data source and set them
    }, []);
    console.log(packages);
    return (
        
        <PackageContext.Provider value={packages}>
            {children}
        </PackageContext.Provider>
    );
}

export default PackageProvider;