import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ColumnProps,
  CRUDDialogProps,
  DIALOG_TYPES,
} from "../../../support/types";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { clean, hexToRgbA } from "../../../support/supportFunctions";
import CaseInput from "../../CaseInput";
import _ from "lodash";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useEffect, useState, useContext } from "react";
import SubmitLoading from "../../SubmitLoading";
import { useLocation } from "react-router-dom";
import { ToastContext } from "../../../context/ToastProvider";
import Alert from "@mui/material/Alert";

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
  dialogSubtitle: {
    paddingLeft: 25,
  },
}));

const CRUDDialog = ({
  dialog,
  columns,
  formData,
  editedRow,
  validate,
  setDialog,
  setFormData,
  addData,
  getData,
  updateData,
  deleteData,
  setEditedRow,
  addSuccessCallback,
}: CRUDDialogProps) => {
  const classes = useStyles();
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<any>(null);
  const [filteredColumns, setFilteredColumns] = useState<ColumnProps[]>([]);
  const [submit, setSubmit] = useState<boolean>(false);
  const { dispatch: setToast } = useContext(ToastContext);
  const location = useLocation();

  const handleClose = () => {
    setEditedRow(null);
    setError(null);
    setDialog(undefined);
    setFormData(null);
    setInputError(null);
  };

  const handleChange = (key: string, value: string | number | any) => {
    if (error) {
      setError(null);
    }
    if (inputError && inputError[key]) {
      setInputError((prev: any) => {
        const newData = { ...prev };
        delete newData[key];
        return newData;
      });
    }
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (validate && validate(formData, setInputError)) {
      return;
    }
    setSubmit(true);
    const newData = { ...formData };
    columns
      .filter((el: ColumnProps) => el.dontSend)
      .forEach((el) => {
        delete newData[el.key];
      });
    switch (dialog?.dialogType) {
      case DIALOG_TYPES.add:
        addData &&
          addData(
            location.pathname === "/users" ? clean(formData) : clean(newData)
          )
            .then((res: any) => {
              if (addSuccessCallback) {
                addSuccessCallback(
                  { ...newData, uid: res.user.uid },
                  res.user.uid
                )
                  .then((res: any) => {
                    setToast({
                      payload: {
                        toastType: "success",
                        open: true,
                        message: "Դուք հաջողությոմբ ավելացրեցիք օգտվող։",
                      },
                    });
                  })
                  .catch((err: any) => {
                    setToast({
                      payload: {
                        toastType: "error",
                        open: true,
                        message: err.message,
                      },
                    });
                  })
                  .finally(() => {
                    getData();
                    handleClose();
                    setSubmit(false);
                  });
              } else {
                setToast({
                  payload: {
                    toastType: "success",
                    open: true,
                    message: "Դուք հաջողությոմբ ավելացրեցիք ինֆորմացիա։",
                  },
                });
                getData();
                handleClose();
                setSubmit(false);
              }
            })
            .catch((err: any) => {
              if (err.code === "auth/email-already-in-use") {
                setError("Էլ․ հասցեն գոյություն ունի");
              } else {
                setError("Տեղի է ունեցել սխալ, փորձեք կրկին։");
              }
              setSubmit(false);
            });
        break;
      case DIALOG_TYPES.edit:
        updateData &&
          updateData(clean(newData), editedRow?.uid || editedRow.id)
            .then((res: any) => {
              setToast({
                payload: {
                  toastType: "success",
                  open: true,
                  message: "Դուք հաջողությոմբ խմբագրեցիք:",
                },
              });
              getData();
              handleClose();
              setSubmit(false);
            })
            .catch((err: any) => {
              setToast({
                payload: {
                  toastType: "error",
                  open: true,
                  message: "Սխալ հարցում։",
                },
              });
              setError("Տեղի է ունեցել սխալ, փորձեք կրկին։");
              setSubmit(false);
            });
        break;
      case DIALOG_TYPES.delete:
        deleteData &&
          deleteData(editedRow.id)
            .then((res: any) => {
              setToast({
                payload: {
                  toastType: "success",
                  open: true,
                  message: "Դուք հաջողությոմբ Ջնջեցիք:",
                },
              });
              getData();
              handleClose();
              setSubmit(false);
            })
            .catch((err: any) => {
              setToast({
                payload: {
                  toastType: "error",
                  open: true,
                  message: "Սխալ հարցում։",
                },
              });
              setError("Տեղի է ունեցել սխալ, փորձեք կրկին։");
              setSubmit(false);
            });
        break;
    }
  };

  useEffect(() => {
    setFilteredColumns(
      columns.filter(
        (el: ColumnProps) =>
          el.formTypes &&
          dialog?.dialogType &&
          el.formTypes.includes(dialog?.dialogType)
      )
    );
  }, [dialog?.dialogType, columns]);

  useEffect(() => {
    if (location.pathname === "/users") {
      ValidatorForm.addValidationRule("isPasswordMatch", (value: string) => {
        if (value !== formData?.password) {
          return false;
        }
        return true;
      });
    }

    return () => {
      if (location.pathname === "/users") {
        ValidatorForm.removeValidationRule("isPasswordMatch");
      }
    };
  }, [formData?.password, formData?.confirmPassword, location.pathname]);

  return (
    <>
      <SubmitLoading submit={submit} />
      <Dialog
        open={dialog?.open || false}
        onClose={handleClose}
        maxWidth={dialog?.dialogWidth || "md"}
        fullWidth={true}
      >
        <DialogTitle>{dialog?.dialogTitle}</DialogTitle>
        {dialog?.dialogSubtitle && (
          <DialogContentText
            className={classes.dialogSubtitle}
            style={{
              textAlign:
                dialog.dialogType === DIALOG_TYPES.delete ? "center" : "left",
            }}
          >
            {dialog.dialogSubtitle}
          </DialogContentText>
        )}
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={2}>
              {filteredColumns.map((el: ColumnProps) => (
                <Grid item xs={12} md={el.mdGrid ? el.mdGrid : 6} key={el.key}>
                  <CaseInput
                    label={el.name}
                    name={el.key}
                    value={_.get(formData, el.key)}
                    onChange={handleChange}
                    type={el.type}
                    error={inputError && !!inputError[el?.key]}
                    helperText={inputError && inputError[el?.key]}
                    jsType={el.jsType}
                    mask={el.mask}
                    options={el.options}
                    onlyRead={el.onlyRead}
                    multiple={el.multiple}
                    placeHolder={el.placeHolder}
                    isRequired={el?.isRequired}
                    minStringLength={el.minStringLength}
                    confirming={el.confirming}
                    disabled={
                      el.disabled &&
                      el.disabled(formData, dialog?.dialogType || "", editedRow)
                    }
                  />
                </Grid>
              ))}
            </Grid>
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
              <Button type="submit" className={classes.submitBtn}>
                {dialog?.dialogType
                  ? getSubmitText(dialog?.dialogType || "")
                  : ""}
              </Button>
            )}
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
};

export default CRUDDialog;
