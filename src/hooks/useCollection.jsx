import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export const useCollection = (collectionName, whereData) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (whereData[2]) {
      const q = query(collection(db, collectionName), where(...whereData));
      onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setData(data);
      });
    }
  }, [collectionName, whereData[2]]);
  return { data };
};
