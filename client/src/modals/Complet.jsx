import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import userAuthStore from "../stores/AuthStore";
import userStore from "../stores/UserStore";

export default function Complet({ DeleteAdmin, Cancel }) {
  const loggedStore = userAuthStore();
  const store = userStore();

  return (
    <form
      onSubmit={store.updateUser}
      className="flex flex-col gap-5 w-full text-slate-700 dark:text-slate-400 laptop:max-w-sm"
    >
      <div className="text-small-heading text-center">
        <p className="text-violet-600 text-medium">
          Hello {loggedStore.user && loggedStore.user.fullName}
        </p>
        please complet your profile informations
      </div>
      <TextField
        type="job"
        name="job"
        color="secondary"
        id="outlined-textarea"
        label="Job"
        placeholder="Your job"
        onChange={store.handleUpdateFieldChange}
        onClick={() => store.toggleUpdate(loggedStore.user)}
      />{" "}
      <TextField
        name="des"
        color="secondary"
        id="outlined-textarea"
        label="Description"
        placeholder="Describe your profile"
        multiline
        rows={4}
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
