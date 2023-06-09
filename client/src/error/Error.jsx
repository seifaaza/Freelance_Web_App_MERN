import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className=" flex flex-col gap-3 justify-center items-center my-12">
      <img
        src="/assets/svg/illustration/Error.svg"
        alt="Error"
        className="w-10/12 tablet:w-8/12 laptop:w-5/12 desktop:w-5/12"
      />
      <div className="flex flex-col items-center gap-3">
        <p className="font-main text-center text-slate-700 text-small-heading max-w-lg tablet:text-lg dark:text-slate-300">
          Oups, Page not found !
        </p>
        <Link to="/">
          <Button variant="contained" className="btn btn-contained w-fit">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
