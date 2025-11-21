import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const MovieContext = createContext();
function MovieProvider({children}) {
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
                 // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
                    const unsubscribe = fetchDocumentsRealtime("movies", (movieList) => {
                      setMovies(movieList);
                    });
                
                    // Hủy lắng nghe khi component bị unmount
                    return () => unsubscribe();
                 
        
        
            },[])
    return (
    
            <MovieContext.Provider value={movies}>
                {children}
            </MovieContext.Provider>
            
        
    );
}

export default MovieProvider;