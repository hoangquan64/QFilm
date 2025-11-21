import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const AuthorContext = createContext();

function AuthorProvider({children}) {
    const [authors,setAuthors]=useState([]);
    useEffect(() => {
        // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
        const unsubscribe = fetchDocumentsRealtime("authors", (authorsList) => {
          setAuthors(authorsList);
        });
    
        // Hủy lắng nghe khi component bị unmount
        return () => unsubscribe();
      }, []);
    return (
        <div>
            <AuthorContext.Provider value = {authors}>
                {children}
            </AuthorContext.Provider>

            
        </div>
    );
}

export default AuthorProvider;