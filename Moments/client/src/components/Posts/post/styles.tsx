import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  cardContainer: {
    marginTop: "-19px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  },
  overlay: {
    marginTop: "-150px",
    position: "absolute",
    // top: "20px",
    // left: "20px",
    padding: "0.5rem",
    color: "white",
    [theme.breakpoints.down("xl")]: {
      marginTop: "-80px",
    },
    [theme.breakpoints.down("lg")]: {
      marginTop: "-70px",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "-82px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "-70px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "-82px",
    },
  },
  overlay2: {
    position: "absolute",
    // top: "20px",
    // right: "20px",
    // background: "red",
    // marginLeft: "357px",
    // marginRight: "1000px",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
    paddingTop: "5px",
  },
  title: {
    padding: "0 16px",
    fontSize: "24px",
  },
  cardActions: {
    // padding: "0 16px 8px 16px",
    // display: "flex",
    // justifyContent: "space-between",
  },
}));
