import { useState, useEffect } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Admins() {
  const [passwordVisibility, setPasswordVisibility] = useState("invisible");
  const [modalOpen, setModalOpen] = useState(false);
  const [admins, setAdmins] = useState(null);
  const [createForm, setCreateForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const res = await axios.get("http://localhost:3000/admins");
    setAdmins(res.data.admins);
    console.log(res);
  };

  const updateCreateForm = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const addAdmin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3000/admins", createForm);

    setAdmins([...admins, res.data.admins]);

    setCreateForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    setModalOpen(false);
  };

  return (
    <>
      <div className="flex gap-6 font-main text-slate-700 dark:text-white w-full">
        <table className=" rounded-md overflow-hidden divide-y divide-slate-800 w-full">
          <thead>
            <tr className="bg-slate-300 dark:bg-slate-600 font-medium">
              <td className="px-8 py-3">First name</td>
              <td className="px-8 py-3">Last name</td>
              <td className="px-8 py-3"> Email</td>
            </tr>
          </thead>
          <tbody>
            {admins &&
              admins.map((item) => {
                return (
                  <tr
                    key={item._id}
                    className="odd:bg-slate-100 even:bg-slate-200 dark:odd:bg-slate-800 dark:even:bg-slate-700 "
                  >
                    <td className="px-8 py-3">{item.firstName}</td>
                    <td className="px-8 py-3">{item.lastName}</td>
                    <td className="px-8 py-3">{item.password}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <Button
          variant="contained"
          size="large"
          endIcon={<PersonAddIcon />}
          className="btn btn-contained h-fit w-fit"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add
        </Button>
      </div>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ bgcolor: "white" }}
          className="p-4 tablet:p-6 laptop:p-8 desktop:p-10 desktop:px-16 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 dark:bg-slate-900 bg-opacity-50 backdrop-blur-lg rounded-lg"
        >
          <div className="flex flex-col gap-5 w-full font-main text-slate-700 dark:text-white laptop:max-w-sm">
            <h1 className="text-3xl text-center ">Add admin</h1>
            <form onSubmit={addAdmin} className="flex flex-col gap-4">
              <TextField
                name="firstName"
                value={createForm.firstName}
                onChange={updateCreateForm}
                type="text"
                color="secondary"
                id="outlined-textarea"
                label="First name"
                placeholder="Your first name"
                required
              />{" "}
              <TextField
                name="lastName"
                value={createForm.lastName}
                onChange={updateCreateForm}
                type="text"
                color="secondary"
                id="outlined-textarea"
                label="Last name"
                placeholder="Your last name"
                required
              />{" "}
              <TextField
                name="email"
                value={createForm.email}
                onChange={updateCreateForm}
                type="email"
                color="secondary"
                id="outlined-textarea"
                label="E-mail"
                placeholder="Your E-mail"
                required
              />{" "}
              <FormControl variant="outlined" required>
                <InputLabel
                  color="secondary"
                  htmlFor="outlined-adornment-password"
                >
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
              <div className="flex  w-fit gap-4">
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<CloseIcon />}
                  className="btn btn-outlined-danger grow"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<CheckIcon />}
                  className="btn btn-contained grow"
                  onClick={() => {
                    console.log(createForm.firstName.trim().length);
                  }}
                  // disabled={`${createForm.firstName.trim().length == 0 ? "true" : "" }`}
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}
