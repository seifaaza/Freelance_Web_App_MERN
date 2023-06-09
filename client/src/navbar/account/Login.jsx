import PropTypes from 'prop-types';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";

export default function Login({ SignSwitch }) {
  return (
    <div className="flex flex-col gap-5 w-full text-slate-700 text-center laptop:max-w-sm">
      <h1 className="text-3xl  dark:text-white">Login</h1>
      <p className="text-small-heading dark:text-slate-300">Welcome Back !</p>
      <TextField
        type="email"
        color="secondary"
        id="outlined-textarea"
        label="E-mail"
        placeholder="Your E-mail"
      />{" "}
      <TextField
        type="password"
        color="secondary"
        id="outlined-textarea"
        label="Password"
        placeholder="Your Password"
      />{" "}
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
          variant="contained"
          size="large"
          startIcon={<LoginIcon />}
          className="btn btn-contained grow"
          onClick={() => SignSwitch("login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

Login.propTypes = {
  SignSwitch: PropTypes.string,
};