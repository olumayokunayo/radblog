import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";

const Users = () => {
  const { id } = useParams();
  console.log(id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserData(id);
  }, []);

  const fetchUserData = (id) => {
    try {
      setIsLoading(true);
      const usersRef = collection(db, "users");
      const q = query(usersRef);
      onSnapshot(q, (snapshot) => {
        const allUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allUsers);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  return <div>Users</div>;
};

export default Users;
