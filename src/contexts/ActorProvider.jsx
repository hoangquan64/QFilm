import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const ActorContext =createContext();
function ActorProvider({children}) {
    const [acthors,setActors] =useState([]);
        useEffect(() => {
            // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
            const unsubscribe = fetchDocumentsRealtime("actors", (actorsList) => {
              setActors(actorsList);
            });
        
            // Hủy lắng nghe khi component bị unmount
            return () => unsubscribe();
          }, []);
    return (
        <ActorContext.Provider value={acthors}>
            {children}
        </ActorContext.Provider>
    );
}

export default ActorProvider;