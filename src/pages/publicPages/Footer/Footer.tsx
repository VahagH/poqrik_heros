import {
  Container,
  Grid,
  makeStyles,
  Link,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import moment from "moment";
import logoWhite from "../../../assets/logoWhite.svg";
import messenger from "../../../assets/icons/messenger.svg";
import phone from "../../../assets/icons/phone.svg";
import facebook from "../../../assets/icons/facebook.png";
import instagram from "../../../assets/icons/instagram.png";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
interface FooterProps {
  isAuthenticated: boolean;
  handleClick: () => void;
}

const useStyles = makeStyles((theme) => ({
  footer: {
    fontSize: 13,
    cursor: "default",
    zIndex: 2,
    fontWeight: 400,
    background: theme.palette.primary.main,
    color: "#faebd7",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: 1500,
    paddingTop: 20,
  },
  section: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexDirection: "column",
    paddingBottom: 5,
  },
  rights: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 35,
    borderTop: "1px solid rgba(255,255,255,0.1)",
    [theme.breakpoints.down(400)]: {
      fontSize: 11,
    },
  },
  appName: {
    marginLeft: 10,
    height: 80,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 4,
    color: "#faebd7",
  },
  circle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    cursor: "pointer",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
  },
  content: {
    marginLeft: 15,
    height: "100%",
    cursor: "pointer",
    flexDirection: "column",
    justifyContent: "center",
    display: "flex",
    "& .contInf": { fontSize: 15, opacity: 0.7 },
  },
  link: {
    height: "max-content",
    display: "flex",
    alignItems: "center",
    "&:hover .circle": {
      background: "rgba(255,255,255,0.2)",
      transition: "0.3s",
    },
  },
  address: {
    marginTop: 10,
    lineHeight: "25px",
    fontSize: 13,
    marginLeft: 10,
    display: "flex",
    opacity: 0.8,
    alignItems: "center",
    "&:hover": { opacity: 1, transition: "0.3s" },
    [theme.breakpoints.down(450)]: {
      fontSize: 11,
    },
  },
  contuctText: {
    marginTop: "20px",
    fontSize: 19,
    [theme.breakpoints.down(400)]: {
      fontSize: 18,
    },
  },
  section2Title: {
    fontSize: 20,
    whiteSpace: "pre",
    fontWeight: 500,
    letterSpacing: "2px",
    [theme.breakpoints.down(960)]: {
      paddingTop: 15,
      borderTop: "1px solid rgba(255,255,255,0.1)",
    },
    [theme.breakpoints.down("xs")]: {
      whiteSpace: "unset",
    },
    [theme.breakpoints.down(400)]: {
      fontSize: 18,
    },
  },
}));

const Footer = ({ handleClick, isAuthenticated }: FooterProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile960 = useMediaQuery(theme.breakpoints.down(960));
  const isMobileXS = useMediaQuery(theme.breakpoints.down("xs"));
  const contucts = [
    {
      name: "Հեռախոս",
      info: "+374 94 80 86 30",
      link: "tel:+37494808630",
      icon: phone,
    },
    {
      name: "Messenger",
      info: "@poqrik_heros",
      link: "https://m.me/poqrikheros",
      icon: messenger,
    },
    {
      name: "Fasebook",
      info: "@poqrik_heros",
      link: "https://www.facebook.com/poqrikheros/",
      icon: facebook,
    },
    {
      name: "Instagram",
      info: "@poqrik_heros.am",
      link: "https://www.instagram.com/poqrikheros.am/",
      icon: instagram,
    },
  ];
  return (
    <div className={classes.footer}>
      <Container className={classes.container}>
        <Grid container>
          <Grid item md={6} xs={12} className={classes.section}>
            <div style={{ display: "flex" }}>
              <img src={logoWhite} alt="" height="80px" />
              <div className={classes.appName}>
                <div>Փոքրիկ</div>
                <div>Հերոս</div>
              </div>
            </div>
            <div className={classes.contuctText}>Գրեք կամ զանգահարեք մեզ՝</div>
            <Grid
              container
              className={classes.container}
              style={{ width: "100%", height: isMobileXS ? 250 : 160 }}
            >
              {contucts.map((el: any, idx: number) => (
                <Grid item md={6} sm={6} xs={12} key={idx}>
                  <div style={{ display: "flex", height: "100%" }}>
                    <Link
                      className={classes.link}
                      target={el.name !== "Հեռախոս" ? "_blank" : "_parent"}
                      href={el.link}
                      underline="none"
                      color="inherit"
                    >
                      <div className={`${classes.circle} circle`}>
                        <img src={el.icon} alt="" height={"23px"} />
                      </div>
                      <div className={classes.content}>
                        <div style={{ fontSize: 14 }}>{el.name}</div>
                        <div className="contInf">{el.info}</div>
                      </div>
                    </Link>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            className={classes.section}
            style={{
              borderLeft: isMobile960
                ? "unset"
                : "1px solid rgba(255,255,255,0.1)",
              paddingLeft: isMobile960 ? "unset" : 50,
            }}
          >
            <div>
              <div className={classes.section2Title}>
                Մանկական տոնական և բեմական {"\n"}հագուստների վարձույթ:
              </div>
              <div className={classes.contuctText}>Մեր հասցեն</div>
              <Link
                target={"_blank"}
                href={
                  "https://www.google.com/maps/place/Kaiser/@40.2046744,44.4752022,18z/data=!4m13!1m7!3m6!1s0x406abd191c9b3331:0x111da3215d800c2b!2zMjIgTWFyc2hhbCBCYWdocmFteWFuIEF2ZSwgWWVyZXZhbiwg0JDRgNC80LXQvdC40Y8!3b1!8m2!3d40.1915816!4d44.5098754!3m4!1s0x406abd63bd1f4361:0x50acb91b935c21b8!8m2!3d40.2047222!4d44.4747222"
                }
                underline="none"
                color="inherit"
              >
                <div className={classes.address}>
                  <FmdGoodOutlinedIcon />{" "}
                  <span style={{ marginLeft: 10 }}>
                    Երևան, Մարգարյան 23/6, Կաիզեր սուպերմարկետ 2րդ հարկ 90
                    տաղավար
                  </span>
                </div>
              </Link>
              <div className={classes.contuctText}>Աշխատանքային օրեր</div>
              <div
                style={{
                  marginTop: 10,
                  lineHeight: "25px",
                  fontSize: 13,
                  opacity: 0.8,
                  marginLeft: 10,
                  letterSpacing: "1px",
                  alignItems: "center",
                }}
              >
                <div>Երկ - Կիր</div>
                <div>11:00 - 19:30</div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.rights}>
        Բոլոր իրա
        <span onClick={() => !isAuthenticated && handleClick()}>վ</span>
        ունքները պաշտպանված են: &copy; {moment().year()}
      </div>
    </div>
  );
};

export default Footer;
