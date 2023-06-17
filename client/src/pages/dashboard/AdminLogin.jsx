import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import adminAuthStore from "../../stores/AdminAuthStore";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";

export default function AdminLogin() {
  const store = adminAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await store.login();
    navigate("/dashboard");
  };
  const [passwordVisibility, setPasswordVisibility] = useState("invisible");

  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex flex-col gap-5 w-full text-slate-700 text-center laptop:max-w-sm">
        <form
          onSubmit={handleLogin}
          encType="multipart/form-data"
          className="flex flex-col gap-5 w-full text-slate-700 laptop:max-w-sm"
        >
          <h1 className="text-3xl text-center dark:text-white">
            Dashboard login
          </h1>
          <TextField
            onChange={store.updateLoginForm}
            value={store.loginForm.email}
            name="email"
            type="text"
            color="secondary"
            id="outlined-textarea"
            label="Admin e-mail"
            placeholder="Your E-mail"
            required
          />{" "}
          <FormControl variant="outlined" required>
            <InputLabel color="secondary" htmlFor="outlined-adornment-password">
              Admin password
            </InputLabel>
            <OutlinedInput
              name="password"
              onChange={store.updateLoginForm}
              value={store.loginForm.password}
              id="outlined-adornment-password"
              type={passwordVisibility == "visible" ? "text" : "password"}
              label="Admin password"
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
      </div>
    </div>
  );
}
