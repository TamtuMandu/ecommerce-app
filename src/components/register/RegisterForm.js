import React from "react";
import { FormControl, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../app/index";
import { registerOrLoginUser } from "../../redux";

const generateLoginFormValues = () => {
  return {
    firstName: {
      value: "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 3 ? null : "Name Should Have At Least 3 Character",
    },
    lastName: {
      value: "",
      required: true,
      error: "",
      validateInput: (lastName) =>
        lastName.length > 3
          ? null
          : "Last Name Should Have At Least 3 Character",
    },

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
          : "Password Should Have At Least 6 Characters",
    },
  };
};

export const RegisterForm = () => {
  const { formValues, onInputChange } = useForm({
    defaultFormValues: generateLoginFormValues(),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = (e) => {
    e.preventDefault();
    const firstName = formValues.firstName.value;
    const lastName = formValues.lastName.value;
    const email = formValues.email.value;
    const password = formValues.password.value;
    const formData = { firstName, lastName, email, password };
    dispatch(registerOrLoginUser({ formValues: formData, isLogin: false }))
      .unwrap()
      .then(() => navigate("/"));
  };
  return (
    <FormControl fullWidth>
      <TextField
        variant="outlined"
        name="firstName"
        label="FirstName"
        value={formValues.firstName.value}
        onChange={onInputChange}
        error={!!formValues.firstName.error}
        helperText={formValues.firstName.error}
        margin="dense"
      />
      <TextField
        variant="outlined"
        name="lastName"
        label="LastName"
        value={formValues.lastName.value}
        onChange={onInputChange}
        error={!!formValues.lastName.error}
        helperText={formValues.lastName.error}
        margin="dense"
      />
      <TextField
        variant="outlined"
        name="email"
        label="Email"
        value={formValues.email.value}
        onChange={onInputChange}
        error={!!formValues.email.error}
        helperText={formValues.email.error}
        margin="dense"
      />
      <TextField
        variant="outlined"
        name="password"
        label="Password"
        value={formValues.password.value}
        onChange={onInputChange}
        error={!!formValues.password.error}
        helperText={formValues.password.error}
        margin="dense"
      />

      <Button onClick={onRegister}>register</Button>
    </FormControl>
  );
};
