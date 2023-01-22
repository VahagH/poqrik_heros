import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import Loading from "../../../components/Loading/Loading";
import { db } from "../../../firebase/firebase";
import Data from "../../../components/Data";
import { filters } from "./filters";

const Dresses = () => {
  const [data, setData] = useState<any[] | null>(null);
  const getData = useCallback(async () => {
    await getDocs(
      query(
        collection(db, "assortment"),
        where("type", "==", "dress"),
        where("status", "==", "active")
      )
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(newData);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  if (!data) {
    return <Loading />;
  }
  return <Data {...{ data, title: "Տոնական", filters }} />;
};

export default Dresses;
