import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export default function SignUp({ ModalOpen }) {
  return (
    <form className="flex flex-col gap-5 w-full text-slate-700 dark:text-slate-400 laptop:max-w-sm">
      <div className="flex items-center gap-5 ">
        <WarningIcon />
        <p>Are you sure that you want to delete your account ?</p>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant="outlined"
          size="large"
          endIcon={<CloseIcon />}
          className="btn btn-outlined "
          onClick={() => {
            ModalOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          endIcon={<CheckIcon />}
          className="btn btn-contained-danger "
          onClick={() => ModalOpen(false)}
        >
          Yes
        </Button>
      </div>
    </form>
  );
}

SignUp.propTypes = {
  ModalOpen: PropTypes.string,
};
