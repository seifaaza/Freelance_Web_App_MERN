import { useEffect } from "react";
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
import ImageIcon from "@mui/icons-material/Image";

export default function Team() {
  const store = TeamStore();

  useEffect(() => {
    store.fetchTeam();
  }, []);

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
            {store.team &&
              store.team.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="odd:bg-slate-100 even:bg-slate-200 dark:odd:bg-slate-800 dark:even:bg-slate-700 "
                  >
                    <td className="px-4 py-3">
                      <Avatar
                        alt={`${item.fullName} photo`}
                        src={
                          item.image !== "avatar"
                            ? `http://localhost:3000/uploads/${item.image}`
                            : null
                        }
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
                          store.toggleUpdate(item);
                        }}
                        className="text-violet"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className="text-danger"
                        onClick={() => store.deleteTeam(item._id)}
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
          onClick={store.addSwitch}
        >
          Add
        </Button>
      </div>
      <Modal
        open={store.modalOpen}
        onClose={store.handleClose}
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
              {store.editToggle ? "Edit" : "Add"}
            </h1>
            <form
              onSubmit={store.editToggle ? store.updateTeam : store.addTeam}
              encType="multipart/form-data"
              className="flex flex-col gap-5"
            >
              <TextField
                value={
                  store.editToggle
                    ? store.updateForm.fullName
                    : store.createForm.fullName
                }
                onChange={
                  store.editToggle
                    ? store.handleUpdateFieldChange
                    : store.updateCreateForm
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
                value={
                  store.editToggle
                    ? store.updateForm.email
                    : store.createForm.email
                }
                onChange={
                  store.editToggle
                    ? store.handleUpdateFieldChange
                    : store.updateCreateForm
                }
                name="email"
                type="email"
                // color={emailError ? "error" : "secondary"}
                id="outlined-textarea"
                // label={emailError ? "This e-mail is already used ! " : "E-mail"}
                placeholder="Your E-mail"
                required
              />{" "}
              <FormControl variant="outlined" className="input-image">
                <OutlinedInput
                  className="input-image text-ellipsis"
                  color="secondary"
                  value={store.editToggle ? store.image : null}
                  startAdornment={
                    <div className="w-full">
                      <input
                        className="input-file"
                        id="my-file"
                        type="file"
                        name="image"
                        onChange={
                          store.editToggle
                            ? store.handleUpdateImage
                            : store.handleImage
                        }
                      />{" "}
                      <div className="flex gap-4 text-violet-600">
                        <ImageIcon />
                        <label
                          tabIndex="0"
                          htmlFor="my-file"
                          className="whitespace-nowrap"
                        >
                          Choose image (Optional)
                        </label>
                        <p className="file-return"></p>
                      </div>
                    </div>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel
                  color="secondary"
                  htmlFor="outlined-adornment-linkedin"
                >
                  Linkedin (optional)
                </InputLabel>
                <OutlinedInput
                  value={
                    store.editToggle
                      ? store.updateForm.linkedin
                      : store.createForm.linkedin
                  }
                  onChange={
                    store.editToggle
                      ? store.handleUpdateFieldChange
                      : store.updateCreateForm
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
                  value={
                    store.editToggle
                      ? store.updateForm.github
                      : store.createForm.github
                  }
                  onChange={
                    store.editToggle
                      ? store.handleUpdateFieldChange
                      : store.updateCreateForm
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
                  value={
                    store.editToggle
                      ? store.updateForm.figma
                      : store.createForm.figma
                  }
                  onChange={
                    store.editToggle
                      ? store.handleUpdateFieldChange
                      : store.updateCreateForm
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
                  onClick={store.handleClose}
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
                  {store.editToggle ? "Edit" : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}
