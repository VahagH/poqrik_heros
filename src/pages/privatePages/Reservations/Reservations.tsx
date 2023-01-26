import { useCallback, useContext, useEffect, useState } from "react";
import CRUDTable from "../../../components/CRUDTable";
import { colapseColumns, columns as defaultColumns } from "./columns";
import { db } from "../../../firebase/firebase";
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

const Reservations = () => {
  const [rows, setRows] = useState<any>(null);
  const [columns, setColumns] = useState<any>(defaultColumns);
  const { state: profileState } = useContext(ProfileContext);

  const validate = (formData: any, setInputError: (data: any) => void) => {
    let errors: any = {};

    if (formData?.price < 100) {
      errors.price = "Գինը չի կարող 100-ից պակաս լինել:";
    }
    if (formData?.price < formData?.deposit) {
      errors.deposit = "Կանխավճարը մեծ է գնից";
    }
    if (!formData?.takeDay) {
      errors.takeDay = "Դաշտը պարտադիր է";
    }
    if (!formData?.bringDay) {
      errors.bringDay = "Դաշտը պարտադիր է";
    }
    if (formData?.bringDay < formData?.takeDay) {
      errors.bringDay = "Բերելու օրը չի կարող փոքր լինել վերցնելու օրից";
    }
    if (Object.keys(errors).length) {
      setInputError(errors);
      return true;
    }
    return false;
  };

  const getData = async () => {
    await getDocs(
      query(collection(db, "reservations"), orderBy("bookingN", "desc"))
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRows(newData);
    });
  };

  const getAssortments = async () => {
    await getDocs(
      query(collection(db, "assortment"), orderBy("code", "desc"))
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setColumns((prev: any) => {
        const newColumns = [...prev];
        const idx = prev.findIndex((el: any) => el.key === "assortment");
        newColumns[idx].options = newData.map((el: any) => ({
          name: el.code.toString(),
          value: el.id,
          sale: el.sale || null,
          price: el.price,
          type: el.type,
        }));
        return newColumns;
      });
    });
  };

  const addData = useCallback(
    async (data: any) => {
      const newData = {
        ...data,
        ...{
          createdAt: +moment().format("X"),
          bookingN: rows?.length ? rows[0].bookingN + 1 : 100001,
          fixer: {
            uid: profileState.uid,
            fullName: `${profileState.firstName} ${profileState.lastName}`,
            email: profileState.email,
          },
        },
      };
      return await addDoc(collection(db, "reservations"), newData);
    },
    [
      rows,
      profileState.email,
      profileState.lastName,
      profileState.firstName,
      profileState.uid,
    ]
  );

  const updateData = useCallback(
    async (data: any, id: string) => {
      const newData = {
        ...data,
        ...{
          updated: {
            at: moment().format("DD-MM-YYYY hh:mm"),
            by: profileState.uid,
          },
        },
      };
      return await updateDoc(doc(db, "reservations", id), newData);
    },
    [profileState.uid]
  );
  const deleteData = useCallback(async (id: string) => {
    return await deleteDoc(doc(db, "reservations", id));
  }, []);

  useEffect(() => {
    getData();
    getAssortments();
  }, []);

  return (
    <CRUDTable
      {...{
        columns,
        rows,
        addData,
        getData,
        updateData,
        deleteData,
        validate,
        colapseColumns,
      }}
    />
  );
};

export default Reservations;
