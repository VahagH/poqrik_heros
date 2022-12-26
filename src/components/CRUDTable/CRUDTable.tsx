import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ColumnProps, CRUDTableProps } from "../../support/types";
import CRUDTableRow from "./components/CRUDTableRow";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import PageActions from "./components/PageActions";
import CRUDDialog from "./components/CRUDDialog";

const CRUDTable = ({
  columns,
  colapseColumns,
  rows,
  addData,
}: CRUDTableProps) => {
  const [isSelected, setSelected] = useState<number | null>(null);
  const filteredColumns = columns.filter((el) =>
    el.hideColumnFromTable ? !el.hideColumnFromTable : true
  );
  const [dialog, setDialog] = useState(undefined);
  const [formData, setFormData] = useState();
  return (
    <>
      <CRUDDialog dialog={dialog} setDialog={setDialog} />
      <PageActions
        addData={addData}
        setDialog={setDialog}
        columns={columns.filter((el) => el.filterable)}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {colapseColumns && <TableCell />}
              {filteredColumns.map((el: ColumnProps) => (
                <TableCell
                  align="left"
                  key={el.key}
                  // style={{ fontWeight: 600, color: "#888" }}
                >
                  {el.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!rows?.length ? (
              rows.map((row, idx) => (
                <CRUDTableRow
                  key={row.name}
                  {...{
                    row,
                    colapseColumns,
                    idx,
                    columns: filteredColumns,
                    isSelected,
                    setSelected,
                  }}
                />
              ))
            ) : (
              <TableRow>
                {rows === null ? (
                  <TableCell align="center" colSpan={filteredColumns.length}>
                    <CircularProgress size={25} color="secondary" />
                  </TableCell>
                ) : (
                  <TableCell align="center" colSpan={filteredColumns.length}>
                    Դուք դեռ չեք ավելացրել ինֆորմացիա
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CRUDTable;
