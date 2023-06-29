import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import adminAuthStore from "../../stores/AdminAuthStore";
import adminStore from "../../stores/AdminStore";
import DeleteModal from "../../modals/DeleteModal";

export default function AdminProfil() {
  const [passwordVisibility, setPasswordVisibility] = useState("invisible");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);

  const store = adminStore();

  const handleThemeSwitch = () => {
    setPasswordVisibility(
      passwordVisibility === "visible" ? "invisible" : "visible"
    );
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    store.fetchAdmin();
  }, []);

  const deleteModalAction = () => {
    setDeleteModel(true);
  };

  const DeleteAdmin = (SignEvent) => {
    store.deleteAdmin(store.admin._id);
  };

  const Cancel = (SignEvent) => {
    store.handleClose();
  };

  return (
    <div className="p-6 flex flex-col gap-10">
      <div className=" flex flex-col tablet:flex-row items-center gap-16 font-main text-slate-700 ">
        <div
          style={{
            backgroundImage: `url(/assets/images/default-avatar.svg)`,
          }}
          className="w-16 h-16 tablet:w-20 tablet:h-20 laptop:w-32 laptop:h-32  rounded-full bg-cover bg-center "
        ></div>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col text-small dark:text-white">
            <h4 className=" text-small-heading">
              {store.admin && store.admin.firstName} {}
              {store.admin && store.admin.lastName}
            </h4>
            <p className=" text-small">{store.admin && store.admin.email}</p>
          </div>
        </div>
      </div>

      <div className="flex w-fit gap-4">
        <Button
          variant="outlined"
          size="large"
          endIcon={<EditIcon />}
          className="btn btn-outlined "
          onClick={() => {
            store.toggleUpdate(store.admin);
            setDeleteModel(false);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          size="large"
          endIcon={<DeleteIcon />}
          className="btn btn-contained-danger"
          onClick={() => {
            store.toggleDelete();
            setDeleteModel(true);
          }}
        >
          Delete my account
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
          {deleteModel ? (
            <DeleteModal DeleteAdmin={DeleteAdmin} Cancel={Cancel} />
          ) : (
            <form onSubmit={store.updateAdmin}>
              <div className="flex flex-col gap-5 w-full font-main text-slate-700 dark:text-white laptop:max-w-sm">
                <h1 className="text-3xl text-center">Edit</h1>
                <div className="flex flex-col gap-4">
                  <TextField
                    type="email"
                    name="email"
                    color="secondary"
                    id="outlined-textarea"
                    label="New e-mail"
                    placeholder="Your new e-mail"
                    value={store.updateForm.email}
                    onChange={store.handleUpdateFieldChange}
                  />{" "}
                  <FormControl variant="outlined">
                    <InputLabel
                      color="secondary"
                      htmlFor="outlined-adornment-password"
                    >
                      New password
                    </InputLabel>
                    <OutlinedInput
                      name="password"
                      id="outlined-adornment-password"
                      type={
                        passwordVisibility == "visible" ? "test" : "password"
                      }
                      label="New password"
                      placeholder="Your new password"
                      color="secondary"
                      onChange={store.handleUpdateFieldChange}
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
                </div>
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
                    Save
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
}
