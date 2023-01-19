import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Data from "../../../components/Data";
import Loading from "../../../components/Loading/Loading";
import { db } from "../../../firebase/firebase";

const Shapes = () => {
  const [data, setData] = useState<any[] | null>(null);
  const getData = async () => {
    await getDocs(
      query(
        collection(db, "assortment"),
        where("status", "==", "active"),
        where("type", "==", "shape")
      )
    ).then((querySnapshot) => {
      const newData = [
        ...querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      ];
      setData(newData);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  if (!data) {
    return <Loading />;
  }
  return <Data {...{ data, title: "Կերպարներ" }} />;
};

export default Shapes;
