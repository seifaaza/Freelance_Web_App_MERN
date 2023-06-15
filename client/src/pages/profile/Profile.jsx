import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import WarningIcon from "@mui/icons-material/Warning";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Profile() {
  return (
    <div className="flex flex-col gap-6 tablet:gap-10 z-10 pt-12 px-3 laptop:px-20 ">
      <div className="flex flex-col bg-white bg-opacity-80 backdrop-blur-lg dark:text-white dark:bg-opacity-5 p-4 tablet:p-6 laptop:p-8 rounded-lg font-main  items-center laptop:items-start justifi-between gap-10  ">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex gap-8 h-fit text-slate-700 w-full text-center laptop:text-start ">
              <Avatar
                sx={{
                  height: "120px",
                  width: "120px",
                  fontSize: "80px",
                }}
                alt="seif"
                src="/public/assets/images/mohamed.jpg"
              ></Avatar>
              <div className="self-center flex flex-col gap-2">
                <h1 className="text-3xl dark:text-white ">Seifeddine AAZA</h1>
                <p className="text-small max-w-xl laptop:max-w-md dark:text-slate-300">
                  Web developer
                </p>
                <Rating name="read-only" value={3} readOnly />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Chip
              label="Available now"
              color="success"
              variant="contained"
              className="font-main "
            />
            {/* <Chip
              label="Unavailable now"
              color="error"
              variant="contained"
              className="font-main "
            /> */}
          </div>
        </div>
        <div className="flex justify-between w-full gap-6">
          <p className="text-small max-w-xl laptop:max-w-md dark:text-slate-300">
            Hello World Community were created to give people a dedicated place
            to connect, share, and get closer to the discussions they care about
            most.
          </p>
          <div className="flex flex-wrap gap-2 max-w-md font-main dark:text-slate-300">
            <Chip
              label="React js"
              variant="outlined"
              className="font-main dark:text-slate-300"
            />
            <Chip
              label="React js"
              variant="outlined"
              className="font-main dark:text-slate-300"
            />
            <Chip
              label="React js"
              variant="outlined"
              className="font-main dark:text-slate-300"
            />
            <Chip
              label="React js"
              variant="outlined"
              className="font-main dark:text-slate-300"
            />
            <Chip
              label="React js"
              variant="outlined"
              className="font-main dark:text-slate-300"
            />
            <Chip
              label="React js"
              variant="outlined"
              className="font-main dark:text-slate-300"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap bg-white bg-opacity-80 backdrop-blur-lg dark:text-white dark:bg-opacity-5 p-4 tablet:p-6 laptop:p-8 rounded-lg font-main gap-6  ">
        <p>hhhh</p>
      </div>
      <div className="flex justify-between bg-white bg-opacity-80 backdrop-blur-lg dark:text-white dark:bg-opacity-5 p-4 tablet:p-6 laptop:p-8 rounded-lg font-main gap-6  ">
        <div className="flex items-center gap-5 text-slate-600 dark:text-slate-400">
          <WarningIcon />
          <p className="max-w-md">
            If you click the button to delete your account there is no option to
            restore the account !
          </p>
        </div>
        <Button
          variant="contained"
          size="medium"
          endIcon={<DeleteIcon />}
          className="btn btn-contained-danger "
        >
          Delete my account
        </Button>
      </div>
    </div>
  );
}
