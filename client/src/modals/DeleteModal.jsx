import { useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import userStore from "../stores/UserStore";

export default function DeleteModel() {
  const store = userStore();

  useEffect(() => {
    store.fetchUser();
  }, []);

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
          onClick={store.handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          endIcon={<CheckIcon />}
          className="btn btn-contained-danger "
          onClick={() => store.deleteAccount(store.user._id)}
        >
          Yes
        </Button>
      </div>
    </form>
  );
}

DeleteModel.propTypes = {
  DeleteAdmin: PropTypes.string,
  Cancel: PropTypes.string,
};
