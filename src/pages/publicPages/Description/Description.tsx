import { useCallback, useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { useLocation, useParams } from "react-router-dom";
import { db, storage } from "../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Description = () => {
  const location = useLocation();
  const { id } = useParams();
  const state = location.state;
  const [data, setData] = useState<any>(state);
  const [url, setUrl] = useState<any | null>(null);

  const getData = useCallback(async () => {
    const docSnap = await getDoc(doc(db, "assortment", id || ""));

    if (docSnap.exists()) {
      setData({
        code: docSnap.data().code,
        title: docSnap.data().title,
        subtitle: docSnap.data().subtitle,
        sale: docSnap.data().sale,
        price: docSnap.data().price,
        minAge: docSnap.data().minAge,
        maxAge: docSnap.data().maxAge,
        type: docSnap.data().type,
        id: docSnap.data().id,
        image: docSnap.data().image,
      });
    }
  }, [id]);

  useEffect(() => {
    if (!data) {
      getData();
    }
    if (!url && data.image) {
      getDownloadURL(ref(storage, data.image)).then((url) => {
        setUrl(url);
      });
    }
  }, [data.image, url, data, getData]);
  return (
    <div>
      <img src={url} alt="" />
    </div>
  );
};

export default Description;
