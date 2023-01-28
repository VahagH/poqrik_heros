import { useContext, useEffect, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import Loading from "../../../components/Loading/Loading";
import { ProfileContext } from "../../../context/ProfileProvider";
import { columns } from "./changePassColumns";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { ColumnProps } from "../../../support/types";
import CaseInput from "../../../components/CaseInput";
import { ToastContext } from "../../../context/ToastProvider";
import _ from "lodash";
import { auth } from "../../../firebase/firebase";
import { updatePassword } from "firebase/auth";
import { hexToRgbA } from "../../../support/supportFunctions";
import packageData from "../../../../package.json";

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
  title: {
    margin: "10px auto",
    fontSize: 20,
    fontWeight: 500,
    width: "max-content",
  },
  validator: {
    maxWidth: 600,
    border: "1px solid #eee",
    padding: 15,
    margin: "0 auto",
  },
  name: {
    fontSize: 28,
    fontWeight: 500,
    width: "max-content",
    margin: "10px auto",
    color: theme.palette.primary.main,
  },
  version: {
    fontSize: 15,
    fontWeight: 500,
    width: "max-content",
    margin: "10px auto",
  },
}));

const MyProfile = () => {
  const { state: profileState } = useContext(ProfileContext);
  const [formData, setFormData] = useState<any>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  const { dispatch: setToast } = useContext(ToastContext);
  const classes = useStyles();

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setSubmit(true);
    const user = auth.currentUser;

    if (user) {
      updatePassword(user, formData.password)
        .then(() => {
          setToast({
            payload: {
              toastType: "success",
              open: true,
              message: "Դուք հաջողությոմբ փոխեցիք ձեր գաղտնաբառը։",
            },
          });
        })
        .catch((error) => {
          setToast({
            payload: {
              toastType: "error",
              open: true,
              message: "Տեղի է ունեցել սխալ, փորձեք մի փոքր ուշ",
            },
          });
        })
        .finally(() => setSubmit(false));
    }
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value: string) => {
      if (value !== formData?.password) {
        return false;
      }
      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [formData?.password, formData?.confirmPassword]);

  if (!profileState.firstName) return <Loading />;

  return (
    <div>
      <div
        className={classes.name}
      >{`${profileState?.firstName} ${profileState?.lastName}`}</div>
      <ValidatorForm onSubmit={handleSubmit} className={classes.validator}>
        <div className={classes.title}>Փոխել գաղտնաբառը</div>
        <Grid container spacing={2}>
          {columns.map((el: ColumnProps) => (
            <Grid item xs={12} md={el.mdGrid ? el.mdGrid : 6} key={el.key}>
              <CaseInput
                label={el.name}
                name={el.key}
                value={_.get(formData, el.key)}
                onChange={handleChange}
                onChangeFunc={el?.onChangeFunc}
                formData={el?.onChangeFunc ? formData : null}
                type={el.type}
                jsType={el.jsType}
                mask={el.mask}
                options={el.options}
                onlyRead={el.onlyRead}
                multiple={el.multiple}
                placeHolder={el.placeHolder}
                isRequired={el?.isRequired}
                minStringLength={el.minStringLength}
                confirming={el.confirming}
              />
            </Grid>
          ))}
        </Grid>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}
        >
          <Button type="submit" disabled={submit} className={classes.submitBtn}>
            Հաստատել
          </Button>
        </div>
      </ValidatorForm>
      <div className={classes.version}>v{packageData.version}</div>
    </div>
  );
};

export default MyProfile;
