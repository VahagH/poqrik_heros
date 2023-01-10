import { Button, makeStyles } from "@material-ui/core";
import { hexToRgbA } from "../../../support/supportFunctions";
import InputBase from "@mui/material/InputBase";
import { ColumnProps, DIALOG_TYPES } from "../../../support/types";

export interface PageActionsProps {
  addData?: (data: any) => void;
  setDialog: (data: any) => void;
  columns: ColumnProps[];
  rows: any;
  setFilteredRows: (data: any) => void;
}
const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  },
  btn: {
    background: theme.palette.primary.main,
    width: 150,
    height: 50,
    borderRadius: 12,
    marginLeft: 10,
    textTransform: "unset",
    fontWeight: 600,
    fontSize: 16,
    color: "#fff",
    "&:hover": {
      background: hexToRgbA(theme.palette.primary.main, "0.8"),
    },
  },
}));

const PageActions = ({
  addData,
  setDialog,
  columns,
  setFilteredRows,
  rows,
}: PageActionsProps) => {
  const classes = useStyles();
  const handleDialogClick = () => {
    setDialog({
      open: true,
      dialogType: DIALOG_TYPES.add,
      dialogTitle: "Ավելացնել օգտվող",
    });
  };
  const handleSearch = (search: string) => {
    setFilteredRows(
      rows.filter((el: any) => {
        for (const key in el) {
          if (el[key]?.toLowerCase().includes(search.toLowerCase())) {
            return true;
          }
        }
      })
    );
  };

  return (
    <div className={classes.wrapper}>
      <div style={{ border: "1px solid #eee", borderRadius: 12 }}>
        <InputBase
          sx={{ width: 250, p: 1, paddingLeft: "15px" }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(event) => {
            handleSearch(event.target.value);
          }}
        />
      </div>
      <div>
        {addData && (
          <Button className={classes.btn} onClick={handleDialogClick}>
            Ավելացնել
          </Button>
        )}
        {!!columns.length && (
          <Button className={classes.btn} /* onClick={handleDialogClick} */>
            Ֆիլտրել
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageActions;
