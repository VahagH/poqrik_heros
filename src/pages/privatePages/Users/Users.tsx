import { useCallback, useEffect, useState } from "react";
import CRUDTable from "../../../components/CRUDTable";
import { columns } from "./columns";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const Users = () => {
  const [rows, setRows] = useState<any>(null);

  const getData = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRows(newData);
    });
  };

  const addData = useCallback((data: any) => {
    return createUserWithEmailAndPassword(auth, data.email, data.password);
  }, []);

  const addSuccessCallback = async (data: any, id: string) => {
    return await setDoc(doc(db, "users", id), data);
  };

  const updateData = async (data: any, id: string) => {
    return await updateDoc(doc(db, "users", id), data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CRUDTable
      {...{ columns, rows, addData, getData, addSuccessCallback, updateData }}
    />
  );
};

export default Users;
