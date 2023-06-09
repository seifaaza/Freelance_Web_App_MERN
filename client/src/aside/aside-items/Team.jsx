import { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Team() {
  const [team, setTeam] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [createForm, setCreateForm] = useState({
    fullName: "",
    image: "",
    email: "",
    social: "",
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const res = await axios.get("http://localhost:3000/team");
    setTeam(res.data.team);
    console.log(res);
  };

  const addTeam = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/team", createForm);
    setTeam([...team, res.data.team]);
    setCreateForm({
      fullName: "",
      image: "",
      email: "",
      social: "",
    });
    setModalOpen(false);
  };

  const updateCreateForm = (e) => {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const deleteTeam = async (_id) => {
    // const res = await axios.delete(`http://localhost:3000/team/${_id}`);
    const newTeam = [...team].filter((team) => {
      return team._id !== _id;
    });
    setTeam(newTeam);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex gap-6 font-main text-slate-700 dark:text-white w-full">
        <table className=" rounded-md overflow-hidden divide-y divide-slate-800 w-full">
          <thead>
            <tr className="bg-slate-300 dark:bg-slate-600 font-medium">
              <td className="px-4 py-3">Image</td>
              <td className="px-4 py-3">Full name</td>
              <td className="px-4 py-3"> Email</td>
              <td className="px-4 py-3"> Social</td>
              <td className="px-4 py-3"> Actions</td>
            </tr>
          </thead>
          <tbody>
            {team &&
              team.map((item) => {
                return (
                  <tr
                    key={team._id}
                    className="odd:bg-slate-100 even:bg-slate-200 dark:odd:bg-slate-800 dark:even:bg-slate-700 "
                  >
                    <td className="px-4 py-3">{item.image}</td>
                    <td className="px-4 py-3">{item.fullName}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">
                      <Stack direction="row" spacing={1}>
                        {item.social != "" &&
                          item.social.map((item, index) => {
                            return item.icon != false &&
                              item.icon != "false" ? (
                              <Chip
                                key={index}
                                label={item.icon}
                                className="material-style"
                              />
                            ) : null;
                          })}
                      </Stack>
                    </td>
                    <td className="px-4 flex items-center justify-center">
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          setEditToggle(true);
                          setModalOpen(true);
                        }}
                        className="text-violet"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className="text-danger"
                        onClick={() => deleteTeam(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
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
            setEditToggle(false);
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
            <h1 className="text-3xl text-center ">
              {" "}
              {editToggle ? "Edit" : "Add"}
            </h1>
            <form
              onSubmit={addTeam}
              encType="multipart/form-data"
              className="flex flex-col gap-5"
            >
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
                value={createForm.email}
                onChange={updateCreateForm}
                name="email"
                type="email"
                color="secondary"
                id="outlined-textarea"
                label="E-mail"
                placeholder="Your E-mail"
                required
              />{" "}
              <input
                value={createForm.image}
                onChange={updateCreateForm}
                type="text"
                name="image"
              />
              <FormControl variant="outlined">
                <InputLabel
                  color="secondary"
                  htmlFor="outlined-adornment-linkedin"
                >
                  Linkedin (optional)
                </InputLabel>
                <OutlinedInput
                  name="linkedin"
                  id="outlined-adornment-linkedin"
                  type="text"
                  label="Linkedin (optional)"
                  placeholder="Linkedin account link"
                  color="secondary"
                  startAdornment={
                    <InputAdornment position="start">
                      <img
                        src={`/assets/svg/icons/linkedin.svg`}
                        className="w-8 grayscale brightness-150 opacity-70"
                      />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel
                  color="secondary"
                  htmlFor="outlined-adornment-github"
                >
                  Github (optional)
                </InputLabel>
                <OutlinedInput
                  name="github"
                  id="outlined-adornment-github"
                  type="text"
                  label="Github (optional)"
                  placeholder="Github account link"
                  color="secondary"
                  startAdornment={
                    <InputAdornment position="start">
                      <img
                        src={`/assets/svg/icons/github.svg`}
                        className="w-8 grayscale brightness-150 opacity-70"
                      />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel
                  color="secondary"
                  htmlFor="outlined-adornment-figma"
                >
                  Figma (optional)
                </InputLabel>
                <OutlinedInput
                  name="figma"
                  id="outlined-adornment-figma"
                  type="text"
                  label="Figma (optional)"
                  placeholder="Figma account link"
                  color="secondary"
                  startAdornment={
                    <InputAdornment position="start">
                      <img
                        src={`/assets/svg/icons/figma.svg`}
                        className="w-8 grayscale brightness-150 opacity-70"
                      />
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

                  // disabled={`${createForm.firstName.trim().length == 0 ? "true" : "" }`}
                >
                  {editToggle ? "Edit" : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}
