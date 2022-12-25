import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { hexToRgbA } from "../../../support/supportFunctions";
import { makeStyles, useTheme } from "@material-ui/core";
import { CRUDTableRowProps } from "../../../support/types";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  row: {
    "&:hover": { background: "#ddd" },
  },
}));

const CRUDTableRow = ({
  row,
  colapseColumns,
  idx,
  columns,
  isSelected,
  setSelected,
}: CRUDTableRowProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow
        className={classes.row}
        onClick={() => setSelected(idx)}
        sx={{
          "& > *": {
            borderBottom: "unset",
            background:
              isSelected === idx
                ? hexToRgbA(theme.palette.secondary.main, "0.4")
                : idx % 2
                ? "unset"
                : hexToRgbA("#eee", "0.5"),
          },
        }}
      >
        {colapseColumns && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {columns.map((column) => (
          <TableCell align="left">
            {column.customElement
              ? column.customElement(
                  _.get(row, column.rowValueKey || column.key),
                  row
                )
              : _.get(row, column.rowValueKey || column.key)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow: any) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default CRUDTableRow;
