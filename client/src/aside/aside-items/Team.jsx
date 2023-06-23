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
import TeamStore from "../../stores/TeamStore";
import Avatar from "@mui/material/Avatar";

export default function Team() {
  // const store = TeamStore();

  // useEffect(() => {
  //   fetchTeam();
  // }, []);

  const [team, setTeam] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [createForm, setCreateForm] = useState({
    fullName: "",
    image: "",
    email: "",
    social: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    fullName: "",
    image: "",
    email: "",
    social: "",
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const res = await axios.get("/team");
    setTeam(res.data.team);
  };

  const updateCreateForm = (e) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const addTeam = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", createForm.image);
    const res = await axios.post("/team", formdata);

    setTeam([...team, res.data.team]);
    setCreateForm({
      fullName: "",
      image: "",
      email: "",
      social: "",
    });
    setModalOpen(false);
  };
  console.log(createForm);

  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (item) => {
    setUpdateForm({
      _id: item._id,
      fullName: item.fullName,
      image: item.image,
      email: item.email,
      social: item.social,
    });
  };

  const updateTeam = async (e) => {
    e.preventDefault();
    const { fullName, email, image, social } = updateForm;
    const res = await axios.put(`/team/${updateForm._id}`, {
      fullName,
      email,
      image,
      social,
    });
    const newTeam = [...team];
    const teamIndex = team.findIndex((team) => {
      return team._id === updateForm._id;
    });
    newTeam[teamIndex] = res.data.team;
    setTeam(newTeam);
    setModalOpen(false);
    setUpdateForm({
      _id: null,
      fullName: "",
      image: "",
      email: "",
      social: "",
    });
  };

  const deleteTeam = async (_id) => {
    const res = await axios.delete(`/team/${_id}`);
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
                    <td className="px-4 py-3">
                      <Avatar
                        alt={`${item.fullName} photo`}
                        src={`http://localhost:3000/uploads/0ad70a64-5c36-4e35-94ad-8789659f5425_.jpg`}
                        sx={{ width: 50, height: 50 }}
                      />
                    </td>
                    <td className="px-4 py-3">{item.fullName}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">
                      <Stack direction="row" spacing={1}>
                        {item.linkedin ? (
                          <Chip label="linkedin" className="material-style" />
                        ) : null}
                        {item.github ? (
                          <Chip label="github" className="material-style" />
                        ) : null}
                        {item.figma ? (
                          <Chip label="figma" className="material-style" />
                        ) : null}
                      </Stack>
                    </td>

                    <td className="px-4 flex items-center justify-center">
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          toggleUpdate(item);
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
              action="/team"
              method="post"
              onSubmit={editToggle ? updateTeam : addTeam}
              encType="multipart/form-data"
              className="flex flex-col gap-5"
            >
              <TextField
                value={editToggle ? updateForm.fullName : createForm.fullName}
                onChange={
                  editToggle ? handleUpdateFieldChange : updateCreateForm
                }
                name="fullName"
                type="text"
                color="secondary"
                id="outlined-textarea"
                label="Full name"
                placeholder="Your full name"
                required
              />{" "}
              <TextField
                // error={emailError ? true : false}
                value={editToggle ? updateForm.email : createForm.email}
                onChange={
                  editToggle ? handleUpdateFieldChange : updateCreateForm
                }
                name="email"
                type="email"
                // color={emailError ? "error" : "secondary"}
                id="outlined-textarea"
                // label={emailError ? "This e-mail is already used ! " : "E-mail"}
                placeholder="Your E-mail"
                required
              />{" "}
              <input
                type="file"
                name="image"
                // onChange={editToggle ? handleUpdateFieldChange : handleImage}
                // onChange={(e) => handleImage(e)}

                onChange={(e) =>
                  setCreateForm({ ...createForm, image: e.target.files[0] })
                }
              />
              <FormControl variant="outlined">
                <InputLabel
                  color="secondary"
                  htmlFor="outlined-adornment-linkedin"
                >
                  Linkedin (optional)
                </InputLabel>
                <OutlinedInput
                  value={editToggle ? updateForm.linkedin : createForm.linkedin}
                  onChange={
                    editToggle ? handleUpdateFieldChange : updateCreateForm
                  }
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
                  value={editToggle ? updateForm.github : createForm.github}
                  onChange={
                    editToggle ? handleUpdateFieldChange : updateCreateForm
                  }
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
                  value={editToggle ? updateForm.figma : createForm.figma}
                  onChange={
                    editToggle ? handleUpdateFieldChange : updateCreateForm
                  }
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
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<CheckIcon />}
                  className="btn btn-contained grow"
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
