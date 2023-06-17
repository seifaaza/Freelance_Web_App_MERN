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
import authStore from "../../stores/AuthStore";
import { useNavigate } from "react-router-dom";

export default function Login({ SignSwitch }) {
  const store = authStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await store.login();
    navigate("/profile");
  };

  const [passwordVisibility, setPasswordVisibility] = useState("invisible");

  return (
    <form
      onSubmit={handleLogin}
      encType="multipart/form-data"
      className="flex flex-col gap-5 w-full text-slate-700 laptop:max-w-sm"
    >
      <h1 className="text-3xl text-center dark:text-white">Login</h1>
      <TextField
        onChange={store.updateLoginForm}
        value={store.loginForm.email}
        name="email"
        type="text"
        color="secondary"
        id="outlined-textarea"
        label="E-mail"
        placeholder="Your E-mail"
        required
      />{" "}
      <FormControl variant="outlined" required>
        <InputLabel color="secondary" htmlFor="outlined-adornment-password">
          Password
        </InputLabel>
        <OutlinedInput
          name="password"
          onChange={store.updateLoginForm}
          value={store.loginForm.password}
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
          startIcon={<PersonAddIcon />}
          className="btn btn-outlined grow"
          onClick={() => SignSwitch("signUp")}
        >
          Sign Up
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<LoginIcon />}
          className="btn btn-contained grow"
        >
          Login
        </Button>
      </div>
      <span
        className={`text-red-600 ${store.loginError ? "block" : "hidden"} `}
      >
        Email or password incorrect !
      </span>
    </form>
  );
}

Login.propTypes = {
  SignSwitch: PropTypes.string,
};
