import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function SignUp({ SignSwitch, ModalOpen }) {
  const [passwordVisibility, setPasswordVisibility] = useState("invisible");
  // const [user, setUser] = useState(null);
  const [createForm, setCreateForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/signup", createForm);
      // const { data } = await UsersApi.createUser(createForm);
      // console.log(data);
      ModalOpen(false);
      window.location.replace("/profile");
      // setUser([...user, res.data.users]);
      // setCreateForm({
      //   fullName: "",
      //   email: "",
      //   password: "",
      // });
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status < 500
      )
        setEmailError(true);
      else {
        setEmailError(false);
      }
    }
  };

  const updateCreateForm = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={addUser}
      encType="multipart/form-data"
      className="flex flex-col gap-5 w-full text-slate-700 laptop:max-w-sm"
    >
      <h1 className="text-3xl text-center dark:text-white">Sign Up</h1>
      <TextField
        value={createForm.fullName}
        onChange={updateCreateForm}
        name="fullName"
        type="text"
        color="secondary"
        id="outlined-textarea"
        label="Full name"
        placeholder="Your full name"
        required
      />{" "}
      <TextField
        error={emailError ? true : false}
        value={createForm.email}
        onChange={updateCreateForm}
        name="email"
        type="text"
        color={emailError ? "error" : "secondary"}
        id="outlined-textarea"
        label={emailError ? "This e-mail is already used ! " : "E-mail"}
        placeholder="Your E-mail"
        required
      />{" "}
      <FormControl variant="outlined" required>
        <InputLabel color="secondary" htmlFor="outlined-adornment-password">
          Password
        </InputLabel>
        <OutlinedInput
          name="password"
          value={createForm.password}
          onChange={updateCreateForm}
          id="outlined-adornment-password"
          type={passwordVisibility == "visible" ? "test" : "password"}
          label="Password"
          placeholder="Your password"
          color="secondary"
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  passwordVisibility == "invisible"
                    ? setPasswordVisibility("visible")
                    : setPasswordVisibility("invisible");
                }}
                edge="end"
              >
                {passwordVisibility === "visible" ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <div className="flex gap-4">
        <Button
          variant="outlined"
          size="large"
          startIcon={<LoginIcon />}
          className="btn btn-outlined  grow"
          onClick={() => SignSwitch("login")}
        >
          Login
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<PersonAddIcon />}
          className="btn btn-contained grow"
          type="submit"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}

SignUp.propTypes = {
  SignSwitch: PropTypes.string,
  ModalOpen: PropTypes.string,
};
