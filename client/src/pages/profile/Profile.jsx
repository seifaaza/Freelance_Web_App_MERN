import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import DeleteModal from "../../modals/DeleteModal";
import EditModal from "../../modals/Edit";
import userAuthStore from "../../stores/AuthStore";
import userStore from "../../stores/UserStore";
import Add from "../../modals/Add";

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [addToggle, setAddToggle] = useState(false);
  const loggedStore = userAuthStore();
  const store = userStore();

  useEffect(() => {
    store.fetchUser();
  }, []);

  const ModalOpen = (SignEvent) => {
    setModalOpen(SignEvent);
  };

  return (
    <div className="flex flex-col gap-6 tablet:gap-10 z-10 pt-12 px-3 laptop:px-20 ">
      <div className="flex flex-col bg-white bg-opacity-80 backdrop-blur-lg dark:text-white dark:bg-opacity-5 p-4 tablet:p-6 laptop:p-8 rounded-lg font-main  items-center laptop:items-start justifi-between gap-10  ">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex gap-8 h-fit text-slate-700 w-full text-center laptop:text-start ">
              <Avatar
                alt={`${store.user && store.user.fullName} photo`}
                src={
                  store.user && store.user.image == "avatar"
                    ? `/assets/images/default-avatar.svg`
                    : `http://localhost:3000/uploads/${
                        store.user && store.user.image
                      }`
                }
                sx={{ width: 150, height: 150 }}
              />
              <div className="self-center flex flex-col gap-2 ">
                <h1 className="text-3xl dark:text-white ">
                  {store.user && store.user.fullName}
                </h1>
                <p className="text-small max-w-xl laptop:max-w-md dark:text-slate-300">
                  {store.user && store.user.job}
                </p>
                <Rating name="read-only" value={3} readOnly />
                {/* <a href="tel:+212668834097" target="_blank" rel="noreferrer"> call </a> */}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <IconButton
              className="h-fit"
              onClick={() => {
                // store.closeDelete(false);
                store.openEdit(true);
                store.toggleUpdate(store.user);
              }}
            >
              <EditIcon className="text-violet-600" />
            </IconButton>
          </div>
        </div>
        <div className="flex justify-between w-full gap-6">
          <div className="flex flex-col gap-3">
            <Link
              onClick={() => {
                window.location.href = `mailto:${
                  store.user && store.user.email
                }`;
              }}
              className="text-small max-w-xl laptop:max-w-md dark:text-slate-300 hover:underline"
            >
              {store.user && store.user.email}
            </Link>
            <p className="text-small max-w-xl laptop:max-w-md text-slate-600 dark:text-slate-300">
              {store.user && store.user.des}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 max-w-md self-start font-main dark:text-slate-300">
            {store.user &&
              store.user.skills.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    label={item}
                    variant="outlined"
                    className="font-main dark:text-slate-300"
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap bg-white bg-opacity-80 backdrop-blur-lg dark:text-white dark:bg-opacity-5 p-4 tablet:p-6 laptop:p-8 rounded-lg font-main gap-6  ">
        <div className="flex justify-end w-full">
          <Button
            variant="contained"
            size="large"
            endIcon={<AddIcon />}
            className="btn btn-contained "
            onClick={store.openAdd}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="flex justify-between bg-white bg-opacity-80 backdrop-blur-lg dark:text-white dark:bg-opacity-5 p-4 tablet:p-6 laptop:p-8 rounded-lg font-main gap-6  ">
        <p className="max-w-md">
          <span className="font-medium"> Warning :</span> If you click the
          button to delete your account there is no option to restore the
          account !
        </p>

        <Button
          variant="contained"
          size="medium"
          endIcon={<DeleteIcon />}
          className="btn btn-contained-danger"
          onClick={store.openDelete}
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
          {store.deleteToggle ? (
            <DeleteModal ModalOpen={ModalOpen} />
          ) : store.addToggle ? (
            <Add />
          ) : store.editToggle ? (
            <EditModal ModalOpen={ModalOpen} />
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
