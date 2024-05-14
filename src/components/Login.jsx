import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { LOGIN } from "./redux/actions/login";
import { useCallback } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./../assets/images/logo.png";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is Required"),
  });
  const LoginHere = useCallback((data) => {
    dispatch({ type: LOGIN, payload: data });
  }, []);
  //  ! if login using dummy api
  // const loginAdd = async (value) => {
  //   const response = await fetch("https://dummyjson.com/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: value.username,
  //       password: value.password,
  //     }),
  //   });
  //   const res = await response.json();
  //   LoginHere(res);
  //   console.log("res=====", res);
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage:
            //   "url(https://source.unsplash.com/random?wallpapers)",
            backgroundImage:'url(https://images.unsplash.com/photo-1475257026007-0753d5429e10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyc3x8fHx8fDE3MTQxMjE3ODk&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080)',
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <img src={logo} alt="logo" className="auth-logo" />
            <div>
              <div className="title">Wel-Come To</div>
              <div className="title">
                <span className="sub_title"> Keyur Mulani's website</span>
              </div>
            </div>
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography> */}
            <Formik
              initialValues={{
                username: "",
                password: "",
                role: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                localStorage.setItem("authUser", JSON.stringify(values));
                navigate("/dashboard");
              }}
            >
              {({
                errors,
                touched,
                handleSubmit,
                handleChange,
                isValid,
                values,
                dirty,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Grid container spacing={2} className="horizontal-line">
                    <Grid item xs={12}>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            role
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="role"
                            value={values.role}
                            label="Age"
                            onChange={handleChange}
                          >
                            <MenuItem value={"admin"}> Admin </MenuItem>
                            <MenuItem value={"superAdmin"}>
                              {" "}
                              Super Admin{" "}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box>
                        <Typography className="field-title">
                          Username
                        </Typography>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          onChange={handleChange}
                          id="username"
                          label="Username"
                          name="username"
                          autoComplete="email"
                          autoFocus
                        />
                        {touched.username && errors.username && (
                          <Typography className="validation-text">
                            {errors.username}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="field-title">Password</Typography>
                      <TextField
                        placeholder="Enter Password"
                        margin="normal"
                        required
                        fullWidth
                        onChange={handleChange}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                      {touched.password && errors.password && (
                        <Typography className="validation-text">
                          {errors.password}
                        </Typography>
                      )}
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
