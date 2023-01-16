import { Container, Grid, makeStyles, Link } from "@material-ui/core";
import moment from "moment";
import logoWhite from "../../../assets/logoWhite.svg";
import messenger from "../../../assets/messenger.svg";
import phone from "../../../assets/phone.png";
import facebook from "../../../assets/facebook.png";
import instagram from "../../../assets/instagram.png";

interface FooterProps {
  isAuthenticated: boolean;
  handleClick: () => void;
}

const useStyles = makeStyles((theme) => ({
  footer: {
    fontSize: 13,
    cursor: "default",
    fontWeight: 400,
    background: theme.palette.primary.main,
    color: "#faebd7",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
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
    height: 53,
    width: 53,
    cursor: "pointer",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    "&:hover": { background: "rgba(255,255,255,0.2)" },
  },
  content: {
    marginLeft: 15,
    height: "100%",
    cursor: "pointer",
    flexDirection: "column",
    justifyContent: "center",
    display: "flex",
  },
  contuctText: { marginTop: "20px", fontSize: 19 },
}));

const Footer = ({ handleClick, isAuthenticated }: FooterProps) => {
  const classes = useStyles();
  const contucts = [
    { name: "Հեռախոս", info: "+374 94 80 86 30", link: "", icon: phone },
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
              style={{ width: "100%", height: 160 }}
            >
              {contucts.map((el: any, idx: number) => (
                <Grid item md={6} xs={12} key={idx}>
                  <div style={{ display: "flex", height: "100%" }}>
                    <Link
                      target={el.name !== "Հեռախոս" ? "_blank" : "_parent"}
                      href={
                        el.name === "Հեռախոս" ? "tel:+37494808630" : el.link
                      }
                      underline="none"
                      color="inherit"
                      style={{
                        height: "max-content",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className={classes.circle}>
                        <img
                          src={el.icon}
                          alt=""
                          height={el.name !== "Messenger" ? "27px" : "35px"}
                        />
                      </div>
                      <div className={classes.content}>
                        <div style={{ fontSize: 14 }}>{el.name}</div>
                        <div style={{ fontSize: 16 }}>{el.info}</div>
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
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              paddingLeft: 20,
            }}
          >
            <div>
              <div style={{ fontSize: 30, fontWeight: 500 }}>Մեր մասին</div>
              <div style={{ marginTop: 20, lineHeight: "25px", fontSize: 13 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
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
