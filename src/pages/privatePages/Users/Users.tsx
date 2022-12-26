import { useCallback, useState } from "react";
import CRUDTable from "../../../components/CRUDTable";
import { columns } from "./columns";

const Users = () => {
  const [rows, setRows] = useState([]);
  const addData = useCallback((data: any) => {}, []);
  const getData = useCallback(() => {}, []);
  return <CRUDTable {...{ columns, rows, addData }} />;
};

export default Users;
