import { TextField } from "@mui/material";
import { Button } from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";

export default function AdminLogin() {
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
          variant="contained"
          size="large"
          startIcon={<LoginIcon />}
          className="btn btn-contained grow"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
