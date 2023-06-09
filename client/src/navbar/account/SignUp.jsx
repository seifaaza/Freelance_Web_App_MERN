import PropTypes from 'prop-types';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";

export default function SignUp({ SignSwitch }) {
  return (
    <div className="flex flex-col gap-5 w-full text-slate-700 laptop:max-w-sm">
      <h1 className="text-3xl text-center dark:text-white">Sign Up</h1>
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
      <TextField
        type="password"
        color="secondary"
        id="outlined-textarea"
        label="Confirm"
        placeholder="Confirm your password"
      />{" "}
      <div className="flex gap-4">
        <Button
          variant="outlined"
          size="large"
          startIcon={<LoginIcon />}
          className="btn btn-outlined grow"
          onClick={() => SignSwitch("login")}
        >
          Login
        </Button>
        <Button
          variant="contained"
          size="large"
          startIcon={<PersonAddIcon />}
          className="btn btn-contained grow"
          onClick={() => SignSwitch("signUp")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  SignSwitch: PropTypes.string,
};
