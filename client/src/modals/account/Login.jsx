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
import authStore from "../../stores/AuthStore";

export default function Login({ SignSwitch, ModalOpen }) {
  const store = authStore();
  const [passwordVisibility, setPasswordVisibility] = useState("invisible");
  // const [user, setUser] = useState(null);
  const [createForm, setCreateForm] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", createForm);
      // const { data } = await UsersApi.createUser(createForm);
      // console.log(data);
      window.location.replace("/profile");
      ModalOpen(false);
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
        setLoginError(true);
      else {
        setLoginError(false);
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
      onSubmit={login}
      encType="multipart/form-data"
      className="flex flex-col gap-5 w-full text-slate-700 laptop:max-w-sm"
    >
      <h1 className="text-3xl text-center dark:text-white">Login</h1>
      <TextField
        // error={loginError ? true : false}
        // value={createForm.email}
        // onChange={updateCreateForm}
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
          // value={createForm.password}
          // onChange={updateCreateForm}
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
          type="submit"
          variant="contained"
          size="large"
          startIcon={<LoginIcon />}
          className="btn btn-contained grow"
        >
          Login
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<PersonAddIcon />}
          className="btn btn-outlined grow"
          onClick={() => SignSwitch("signUp")}
        >
          Sign Up
        </Button>
      </div>
      <span className={`text-red-600 ${loginError ? "block" : "hidden"} `}>
        Email or password incorrect !
      </span>
    </form>
  );
}

Login.propTypes = {
  SignSwitch: PropTypes.string,
  ModalOpen: PropTypes.string,
};
