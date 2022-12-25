import React from "react";
import CRUDTable from "../../../components/CRUDTable";
import { columns } from "./columns";

const Users = () => {
  const rows: any = null;
  return <CRUDTable {...{ columns, rows }} />;
};

export default Users;
