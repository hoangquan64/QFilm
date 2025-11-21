import React, { createContext, useEffect, useState } from 'react';
import { fetchDocumentsRealtime } from '../services/firebaseService';
export const PlanContext = createContext();
function PlanProvider({children}) {
  const [plans,setPlans]=useState([]);
  useEffect(() => {
          // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
          const unsubscribe = fetchDocumentsRealtime("plans", (plansList) => {
            setPlans(plansList);
          });
      
          // Hủy lắng nghe khi component bị unmount
          return () => unsubscribe();
        }, []);
console.log(plans);

  return (
      <PlanContext.Provider value={plans}>
          {children}
      </PlanContext.Provider>
  );
}

export default PlanProvider;