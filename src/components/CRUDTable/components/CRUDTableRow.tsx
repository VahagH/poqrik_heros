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
import {
  currencyFormatterDecimal,
  hexToRgbA,
  timeZoneDateTime,
} from "../../../support/supportFunctions";
import { makeStyles, useTheme } from "@material-ui/core";
import { CRUDTableRowProps, DIALOG_TYPES } from "../../../support/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import _ from "lodash";
import FadeMenu from "../../FadeMenu";
import moment from "moment";
import PopoverComponent from "../../PopoverComponent";

const useStyles = makeStyles((theme) => ({
  row: {
    "&:hover": { background: "#eee" },
  },
  popover: {
    position: "sticky",
    right: 0,
    top: 0,
    width: 10,
    textAlign: "center",
    maxWidth: 35,
    borderLeft: "1px solid #ddd",
    borderTop: "1px solid #ddd",
  },
}));

const CRUDTableRow = ({
  row,
  colapseColumns,
  idx,
  columns,
  filteredColumns,
  isSelected,
  setSelected,
  setEditedRow,
  updateData,
  setDialog,
  deleteData,
}: CRUDTableRowProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Խմբագրել",
      onClick: () => {
        setEditedRow(row);
        setDialog({
          open: true,
          dialogType: DIALOG_TYPES.edit,
          dialogTitle: "Խմբագրում",
        });
      },
      hideAction: () => !!updateData,
    },
    {
      name: "Ջնջել",
      onClick: () => {
        setEditedRow(row);
        setDialog({
          open: true,
          dialogType: DIALOG_TYPES.delete,
          dialogTitle: "Ջնջել",
          dialogSubtitle: "Հաստատեք ջնջումը",
          dialogWidth: "xs",
        });
      },
      hideAction: () => !!deleteData,
    },
  ];

  return (
    <Fragment>
      <TableRow
        className={classes.row}
        onClick={() => setSelected(idx)}
        sx={{
          "& > *": {
            borderBottom: "unset",
            backgroundColor:
              isSelected === idx
                ? hexToRgbA(theme.palette.secondary.main, "0.4")
                : idx % 2
                ? "unset"
                : hexToRgbA("#eee", "0.5"),
            background:
              +moment().format("X") > +row.takeDay / 1000 &&
              row.status === "reserved"
                ? hexToRgbA("#f2bb05", "0.8")
                : +moment().format("X") > +row.bringDay / 1000 &&
                  row.status === "taken"
                ? "rgba(233, 100, 100, 0.9)"
                : "",
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
        {filteredColumns.map((column) => (
          <TableCell
            align="left"
            key={column.key}
            style={
              column.customStyle
                ? column.customStyle(
                    _.get(row, column?.rowValueKey || column.key),
                    row
                  )
                : null
            }
          >
            {column.customElement
              ? column.customElement(
                  _.get(row, column?.rowValueKey || column.key),
                  row
                )
              : _.get(row, column?.rowValueKey || column.key) || "- - - "}
          </TableCell>
        ))}
        {(updateData || deleteData) && (
          <TableCell
            align="center"
            className={classes.popover}
            style={{
              backgroundColor: "#fff",
              maxWidth: 35,
              padding: 3,
            }}
          >
            <FadeMenu
              icon={<MoreVertIcon />}
              menuItems={menuItems}
              disable={false}
            />
          </TableCell>
        )}
      </TableRow>
      {colapseColumns && (
        <TableRow style={{ background: "rgba(164,94,229,0.3)", width: "100%" }}>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={columns.length}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <div style={{ display: "flex" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    style={{
                      marginRight: 20,
                      color:
                        +moment().format("X") > +row.takeDay / 1000 &&
                        row.status === "reserved"
                          ? "#f2bb05"
                          : "",
                    }}
                  >
                    Վերցնելու օր
                    <div style={{ fontSize: 15 }}>
                      {timeZoneDateTime(+row.takeDay / 1000)}
                    </div>
                  </Typography>

                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    style={{
                      marginRight: 20,
                      color:
                        +moment().format("X") > +row.bringDay / 1000 &&
                        row.status === "taken"
                          ? "rgba(233, 100, 100, 0.9)"
                          : "",
                    }}
                  >
                    Բերելու օր
                    <div style={{ fontSize: 15 }}>
                      {timeZoneDateTime(+row.bringDay / 1000)}
                    </div>
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div">
                    Ամրագրող
                    <div
                      style={{
                        fontSize: 14,
                        whiteSpace: "pre",
                        marginRight: 20,
                      }}
                    >
                      {`${row?.fixer?.fullName} \n${row?.fixer?.email}`}
                    </div>
                  </Typography>
                  {row.status === "reserved" && (
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                      style={{ marginRight: 20 }}
                    >
                      Մնացել է վճարելու
                      <div style={{ fontSize: 14 }}>
                        {currencyFormatterDecimal(row.price - row.deposit)}
                      </div>
                    </Typography>
                  )}
                  {row.notes && (
                    <Typography variant="h6" gutterBottom component="div">
                      Նշումներ
                      <div style={{ fontSize: 14 }}>
                        <PopoverComponent title={row.notes} showDotes>
                          <div style={{ fontSize: 14 }}>{row.notes}</div>
                        </PopoverComponent>
                      </div>
                    </Typography>
                  )}
                </div>
                <Typography variant="h6" gutterBottom component="div">
                  Տեսականի
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {colapseColumns.map((el: any) => (
                        <TableCell
                          align="left"
                          key={el.key}
                          style={{ fontWeight: 600 }}
                        >
                          {el.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.assortment.map((assort: any, idx: number) => (
                      <TableRow
                        key={idx}
                        style={{
                          background: assort.sale
                            ? "rgba(233, 100, 100, 0.4)"
                            : "",
                        }}
                      >
                        {colapseColumns.map((el: any) => (
                          <TableCell align="left" key={el.key}>
                            {el.customElement
                              ? el.customElement(assort[el.key])
                              : assort[el.key]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
};

export default CRUDTableRow;
