import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { ColumnProps, CRUDTableProps } from "../../support/types";
import CRUDTableRow from "./components/CRUDTableRow";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import PageActions from "./components/PageActions";
import CRUDDialog from "./components/CRUDDialog";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  popover: {
    position: "sticky",
    right: 0,
    top: 0,
    width: 10,
  },
}));

const CRUDTable = ({
  columns,
  colapseColumns,
  rows,
  validate,
  addData,
  getData,
  updateData,
  deleteData,
  addSuccessCallback,
}: CRUDTableProps) => {
  const classes = useStyles();
  const [isSelected, setSelected] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<any>(null);
  const [dialog, setDialog] = useState(undefined);
  const [filteredRows, setFilteredRows] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const filteredColumns = columns.filter((el) =>
    el.hideColumnFromTable ? !el.hideColumnFromTable : true
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    rows && setFilteredRows(rows);
  }, [rows]);

  return (
    <>
      <CRUDDialog
        dialog={dialog}
        columns={columns}
        editedRow={editedRow}
        setDialog={setDialog}
        addData={addData}
        getData={getData}
        setEditedRow={setEditedRow}
        validate={validate}
        updateData={updateData}
        deleteData={deleteData}
        addSuccessCallback={addSuccessCallback}
      />
      <div>
        <PageActions
          addData={addData}
          setDialog={setDialog}
          columns={columns.filter((el) => el.filterable)}
          setFilteredRows={setFilteredRows}
          rows={rows}
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
                    style={{
                      fontWeight: 600,
                      color: "#888",
                      minWidth: "max-content",
                    }}
                  >
                    {el.shortName ? el.shortName : el.name}
                  </TableCell>
                ))}
                {(updateData || deleteData) && (
                  <TableCell
                    className={classes.popover}
                    style={{ background: "#fff", maxWidth: 35, padding: 3 }}
                  />
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {!!rows?.length ? (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, idx: number) => (
                    <CRUDTableRow
                      key={row.id}
                      {...{
                        row,
                        colapseColumns,
                        idx,
                        columns,
                        filteredColumns,
                        setEditedRow,
                        isSelected,
                        setDialog,
                        setSelected,
                        updateData,
                        deleteData,
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
      </div>
      <TablePagination
        rowsPerPageOptions={[30, 50, 100, 300]}
        component="div"
        labelRowsPerPage="Տողերի քանակ"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CRUDTable;
