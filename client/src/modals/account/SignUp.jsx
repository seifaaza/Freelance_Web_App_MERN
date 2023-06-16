import { useState } from "react";
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
import UserStore from "../../stores/UserStore";

export default function SignUp({ SignSwitch }) {
  const store = UserStore();

  const [passwordVisibility, setPasswordVisibility] = useState("invisible");
  return (
    <form
      onSubmit={store.signup}
      encType="multipart/form-data"
      className="flex flex-col gap-5 w-full text-slate-700 laptop:max-w-sm"
    >
      <h1 className="text-3xl text-center dark:text-white">Sign Up</h1>
      <TextField
        value={store.createForm.fullName}
        onChange={store.updateCreateForm}
        name="fullName"
        type="text"
        color="secondary"
        id="outlined-textarea"
        label="Full name"
        placeholder="Your full name"
        required
      />{" "}
      <TextField
        error={store.emailError ? true : false}
        value={store.createForm.email}
        onChange={store.updateCreateForm}
        name="email"
        type="text"
        color={store.emailError ? "error" : "secondary"}
        id="outlined-textarea"
        label={store.emailError ? "This e-mail is already used ! " : "E-mail"}
        placeholder="Your E-mail"
        required
      />{" "}
      <FormControl variant="outlined" required>
        <InputLabel color="secondary" htmlFor="outlined-adornment-password">
          Password
        </InputLabel>
        <OutlinedInput
          name="password"
          value={store.createForm.password}
          onChange={store.updateCreateForm}
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
