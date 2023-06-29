import { useEffect, useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import ImageIcon from "@mui/icons-material/Image";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import userStore from "../stores/UserStore";

export default function Complet({ DeleteAdmin, Cancel }) {
  const store = userStore();

  useEffect(() => {
    store.fetchUser();
  }, []);

  return (
    <form
      onSubmit={store.updateUser}
      encType="multipart/form-data"
      className="flex flex-col gap-5 w-full text-slate-700 dark:text-slate-400 laptop:max-w-sm"
    >
      <div className="text-small-heading text-center mb-6">
        <p className="text-violet-600 text-medium">
          Hello {store.user && store.user.fullName}{" "}
        </p>
        please complet your profile informations
      </div>
      <FormControl variant="outlined" className="input-image">
        <OutlinedInput
          className="input-image text-ellipsis"
          color="secondary"
          startAdornment={
            <div className="w-full">
              <input
                className="input-file"
                id="my-file"
                type="file"
                name="image"
                onChange={store.handleUpdateImage}
              />{" "}
              <div className="flex gap-4 text-violet-600">
                <ImageIcon />
                <label
                  tabIndex="0"
                  htmlFor="my-file"
                  className="whitespace-nowrap"
                >
                  Add profile picture
                </label>
                <p className="file-return"></p>
              </div>
            </div>
          }
        />
      </FormControl>
      <TextField
        type="text"
        name="job"
        color="secondary"
        id="outlined-textarea"
        label="Job"
        placeholder="Your job"
        value={store.updateForm.job}
        onChange={store.handleUpdateFieldChange}
      />{" "}
      <TextField
        type="text"
        name="des"
        color="secondary"
        id="outlined-textarea"
        label="Description"
        placeholder="Describe your profile"
        multiline
        rows={4}
        value={store.updateForm.des}
        onChange={store.handleUpdateFieldChange}
      />{" "}
      <div className="flex justify-center gap-4">
        <Button
          variant="outlined"
          size="large"
          endIcon={<CloseIcon />}
          className="btn btn-outlined-danger grow"
          onClick={store.handleClose}
        >
          Skip
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
    </form>
  );
}

Complet.propTypes = {
  DeleteAdmin: PropTypes.string,
  Cancel: PropTypes.string,
};
