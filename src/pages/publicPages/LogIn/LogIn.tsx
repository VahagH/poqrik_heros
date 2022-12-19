import { makeStyles, Button } from "@material-ui/core";
import logo from "../../../assets/logo.svg";
import { ValidatorForm } from "react-material-ui-form-validator";
import { columns } from "./columns";
import _ from "lodash";
import CaseInput from "../../../components/CaseInput";
import { ColumnProps } from "../../../types";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { hexToRgbA } from "../../../supportFunctions";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 500,
    height: 400,
    color: theme.palette.primary.main,
    overflow: "hidden",
    overflowY: "auto",
    display: "flex",
    minHeight: 350,
    maxWidth: 700,
    alignItems: "center",
    flexDirection: "column",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    borderRadius: 10,
    padding: 15,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      height: "50%",
    },
  },
  valdate: {
    width: "100%",
    height: "80%",
  },
  btnSubmit: {
    height: 45,
    width: 150,
    background: `${theme.palette.primary.main}`,
    color: "#fff",
    textAlign: "right",
    "&:hover": {
      background: hexToRgbA(theme.palette.primary.main),
    },
  },
  error: {
    margin: 5,
    color: "red",
    height: 20,
  },
  inputCont: {
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "column",
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 15,
    cursor: "pointer",
  },
}));

interface LogInProp {
  email: string;
  password: string;
}

const LogIn = () => {
  const classes = useStyles();
  const [clickInfo, setClickInfo] = useState<{
    submit?: boolean;
    error?: string;
  } | null>(null);
  const [formData, setFormData] = useState<LogInProp>({
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = () => {
    // setClickInfo({ submit: true, error: "cascsa" });
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <img src={logo} alt="" height="100px" />
        <div className={classes.error}>{clickInfo?.error}</div>
        <ValidatorForm onSubmit={handleSubmit} className={classes.valdate}>
          <div className={classes.inputCont}>
            <div>
              {columns.map((el: ColumnProps) => (
                <CaseInput
                  type={el.type}
                  label={el.name}
                  key={el.key}
                  value={_.get(formData, el.key)}
                  name={el.key}
                  onChange={handleChange}
                  disabled={clickInfo?.submit}
                />
              ))}
            </div>
            <div className={classes.buttons}>
              <Button component={Link} to={"/resetPassword"}>
                Մոռացել եք գաղտնաբառը՞
              </Button>
              <Button type="submit" className={classes.btnSubmit}>
                {clickInfo?.submit ? (
                  <CircularProgress size={20} color={"inherit"} />
                ) : (
                  "Մուտք"
                )}
              </Button>
            </div>
          </div>
        </ValidatorForm>
      </div>
    </div>
  );
};

export default LogIn;
