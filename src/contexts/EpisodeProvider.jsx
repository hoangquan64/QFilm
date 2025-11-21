import React, { createContext, use, useContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const EpisodeContext = createContext();
function EpisodeProvider({children}) {
    const [episodes,setEpisodes] = useState([]);
    useEffect(() => {
            // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
            const unsubscribe = fetchDocumentsRealtime("episodes", (episodesList) => {
              setEpisodes(episodesList);
            });
        
            // Hủy lắng nghe khi component bị unmount
            return () => unsubscribe();
          }, []);
 
    return (
      <EpisodeContext.Provider value={episodes}>
        {children}
      </EpisodeContext.Provider>
    );
}

export default EpisodeProvider;