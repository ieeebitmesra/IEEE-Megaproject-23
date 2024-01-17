//@ts-nocheck
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Link,
  Typography,
  Toolbar,
  Avatar,
  Button,
} from "@material-ui/core";
import decode from "jwt-decode";
import moments from "../../images/moments.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";

function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem("profile"))
  );
  // console.log(user);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken: any = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          //   component={Link}
          //   to="/"
          className={classes.heading}
          variant="h3"
          align="center"
        >
          <Link href="/" underline="none">
            Moments
          </Link>
        </Typography>
        <img
          className={classes.image}
          src={moments}
          alt="moments"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Link href="/auth" underline="none">
              <Button variant="contained" color="primary">
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
