import { Typography, AppBar, makeStyles } from "@material-ui/core";
import VedioPlayer from "./components/VedioPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  header: {
    fontFamily: "Roboto",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));
function App() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography
          className={classes.header}
          variant="h4"
          align="center"
          fontStyle="italic"
        >
          ChatNexus
        </Typography>
      </AppBar>
      <VedioPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}

export default App;
