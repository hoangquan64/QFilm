import React, { createContext, useEffect, useState } from 'react';
import { Children } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const Movie_typeContext = createContext();
function Movie_typeProvider({children}) {
    const [movies_Type,setmovies_Type]=useState([]);
    useEffect(()=>{
         // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
            const unsubscribe = fetchDocumentsRealtime("movies_Type", (moviesList) => {
              setmovies_Type(moviesList);
            });
        
            // Hủy lắng nghe khi component bị unmount
            return () => unsubscribe();
    },[])




    return (
      <Movie_typeContext.Provider value={movies_Type}>
         {children}
      </Movie_typeContext.Provider>

       
          
    );
}

export default Movie_typeProvider;