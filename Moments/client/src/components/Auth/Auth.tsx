//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import useStyles from "./styles";
import jwt_decode from "jwt-decode";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState(initialState);

  // const handleSignOut = (event) => {
  //   setUser({});
  //   document.getElementById("signInDiv").hidden = false;
  // };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "797847668640-m6hk2og01eor7qmr2iii2ml1sko9625q.apps.googleusercontent.com",
      callback: googleSuccessResponse,
      prompt_parent_id: "g_id_onload",
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword();
  };
  const googleSuccessResponse = async (res: any) => {
    var token = res.credential;
    var result = jwt_decode(res.credential);
    // console.log("token: ", token);
    // console.log("result: ", result);
    document.getElementById("signInDiv").hidden = true;

    try {
      dispatch({ type: "Auth", data: { result, token } });
      const action = { result, token };
      localStorage.setItem("profile", JSON.stringify({ ...action }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailureResponse = (error: any) => {
    console.log(error);
    console.log("Google Sign was unsuccessful. try Again later");
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <AcUnitIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />

                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  ></Input>
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <div id="signInDiv"></div>
            {/* {Object.keys(user).length != 0 && (
              <button onClick={(e) => handleSignOut(e)}></button>
            )} */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default Auth;
