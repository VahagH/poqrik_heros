import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import { db } from "../../../firebase/firebase";
import Data from "../../../components/Data";

const Dresses = () => {
  const [data, setData] = useState<any[] | null>(null);
  const getData = async () => {
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
  };
  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <Loading />;
  }
  return <Data {...{ data, title: "Տոնական" }} />;
};

export default Dresses;
