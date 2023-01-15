import { useCallback, useContext, useEffect, useState } from "react";
import CRUDTable from "../../../components/CRUDTable";
import { columns } from "./columns";
import { db, storage } from "../../../firebase/firebase";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { ProfileContext } from "../../../context/ProfileProvider";
import moment from "moment";
import { ref, uploadBytes, deleteObject } from "firebase/storage";

const Assortment = () => {
  const [rows, setRows] = useState<any>(null);
  const { state: profileState } = useContext(ProfileContext);

  const getData = async () => {
    await getDocs(
      query(collection(db, "assortment"), orderBy("code", "desc"))
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRows(newData);
    });
  };

  const addData = useCallback(
    async (data: any) => {
      let image = null;
      if (data?.image) {
        image = `img/${moment().format("X")}`;
        const storageRef = ref(storage, image);

        uploadBytes(storageRef, data.image.file);
      }

      const newData = {
        ...data,
        ...{
          createdAt: +moment().format("X"),
          code: rows?.length ? rows[0].code + 1 : 1001,
          image,
        },
      };
      return await addDoc(collection(db, "assortment"), newData);
    },
    [rows]
  );

  const updateData = useCallback(
    async (data: any, id: string) => {
      let image = null;
      if (data?.image && typeof data?.image !== "string") {
        image = `img/${moment().format("X")}`;
        const storageRef = ref(storage, image);

        uploadBytes(storageRef, data.image.file);
      }
      const newData = {
        ...data,
        ...{
          image,
          updated: {
            at: moment().format("DD-MM-YYYY hh:mm"),
            by: profileState.uid,
          },
        },
      };
      if (data?.deleteImgName) {
        const desertRef = ref(storage, data.deleteImgName);
        delete newData.deleteImgName;
        deleteObject(desertRef);
      }

      return await updateDoc(doc(db, "assortment", id), newData);
    },
    [profileState.uid]
  );
  const deleteData = useCallback(async (id: string) => {
    return await deleteDoc(doc(db, "assortment", id));
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <CRUDTable
      {...{ columns, rows, addData, getData, updateData, deleteData }}
    />
  );
};

export default Assortment;
