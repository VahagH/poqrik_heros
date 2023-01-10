import React, { useContext } from "react";
import { ToastContext } from "../../context/ToastProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Toast = () => {
  const { state, dispatch } = useContext(ToastContext);
  const handleClose = () => {
    dispatch({ payload: { open: false, toastType: "success", message: "" } });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={state.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity={state.toastType} onClose={handleClose}>
        {state.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
