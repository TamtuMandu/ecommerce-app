import { Button, FormControl, TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../app/index";
import { registerOrLoginUser } from "../../redux";

const generateLoginFormValues = () => {
  return {
    email: {
      value: "",
      required: true,
      error: "",
      validateInput: (email) =>
        email.includes("@gmail.com") ? null : "Email Isn't valid",
    },
    password: {
      value: "",
      required: true,
      error: "",
      validateInput: (password) =>
        password.length > 6
          ? null
          : "Password Should Have At Least 7 Characters",
    },
  };
};

export const LoginForm = () => {
  const { formValues: loginFormValues, onInputChange } = useForm({
    defaultFormValues: generateLoginFormValues(),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    const email = loginFormValues.email.value;
    const password = loginFormValues.password.value;
    const formDataLogin = { email, password };
    dispatch(registerOrLoginUser({ formValues: formDataLogin, isLogin: true }))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };
  return (
    <FormControl fullWidth>
      <TextField
        variant="outlined"
        name="email"
        label="Email"
        value={loginFormValues.email.value}
        onChange={onInputChange}
        error={!!loginFormValues.email.error}
        helperText={loginFormValues.email.error}
        margin="dense"
      />
      <TextField
        variant="outlined"
        name="password"
        label="Password"
        value={loginFormValues.password.value}
        onChange={onInputChange}
        error={!!loginFormValues.password.error}
        helperText={loginFormValues.password.error}
        margin="dense"
      />

      <Button onClick={onLogin}>login</Button>
    </FormControl>
  );
};

export default LoginForm;
