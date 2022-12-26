import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CRUDDialogProps, DIALOG_TYPES } from "../../../support/types";
import { Button, makeStyles } from "@material-ui/core";
import { hexToRgbA } from "../../../support/supportFunctions";

function getSubmitText(data: string) {
  switch (data) {
    case DIALOG_TYPES.add:
      return "Ավելացնել";
    case DIALOG_TYPES.delete:
      return "Ջնջել";
    case DIALOG_TYPES.edit:
      return "Պահպանել";
    default:
      return "Հաստատել";
  }
}

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    width: "50%",
    maxWidth: 160,
    height: 45,
    borderRadius: 12,
    background: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: 16,
    textTransform: "unset",
    color: "#fff",
    "&:hover": {
      background: hexToRgbA(theme.palette.primary.main, "0.8"),
    },
  },
  cancelBtn: {
    width: "50%",
    maxWidth: 160,
    borderRadius: 12,
    height: 45,
    fontWeight: 500,
    fontSize: 16,
    textTransform: "unset",
    color: "#666",
  },
}));

const CRUDDialog = ({ dialog, setDialog }: CRUDDialogProps) => {
  const classes = useStyles();
  const handleClose = () => {
    setDialog(undefined);
  };

  return (
    <Dialog
      open={dialog?.open || false}
      onClose={handleClose}
      maxWidth={dialog?.dialogWidth || "md"}
      fullWidth={true}
    >
      <DialogTitle>{dialog?.dialogTitle}</DialogTitle>
      <DialogContent>
        {dialog?.dialogSubtitle && (
          <DialogContentText>{dialog.dialogSubtitle}</DialogContentText>
        )}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions
        style={{
          justifyContent:
            dialog?.dialogType === DIALOG_TYPES.delete ? "end" : "center",
          marginBottom: 10,
        }}
      >
        <Button onClick={handleClose} className={classes.cancelBtn}>
          {dialog?.dialogType === DIALOG_TYPES.read ? "Փակել" : "Չեղարկել"}
        </Button>
        {dialog?.dialogType !== "read" && (
          <Button onClick={handleClose} className={classes.submitBtn}>
            {dialog?.dialogType ? getSubmitText(dialog?.dialogType || "") : ""}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CRUDDialog;
