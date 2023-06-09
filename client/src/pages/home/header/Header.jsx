import Button from "@mui/material/Button";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Link } from "react-router-dom";
// import SubHeader from "./SubHeader";

export default function Header() {
  return (
    <div className="flex flex-col gap-3">
      <div className="py-10 pt-16 px-3 flex flex-col tablet:flex-row justify-between items-center gap-16 laptop:gap-36 laptop:px-8 tablet:pt-40">
        <div className="heading text-center tablet:text-start font-main text-slate-700 flex flex-col items-center tablet:items-start gap-5 laptop:gap-3">
          <div className=" font-title text-large tablet:text-large bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 laptop:mb-5">
            Launch Now, Rise{" "}
            <span className="whitespace-nowrap"> Forever !</span>
          </div>

          <p className="text-small-heading max-w-lg tablet:max-w-lg dark:text-slate-300">
            Find your freelance service, sell your project and get inspired with
            portfolios, artworks and designs
          </p>
          <div className="flex mt-2 justify-center gap-4 tablet:gap-4 tablet:justify-start laptop:mt-4 whitespace-nowrap">
            <Button
              component={Link}
              to="/started"
              variant="contained"
              className="btn btn-contained "
              size="large"
              endIcon={<RocketLaunchIcon />}
            >
              Get Started
            </Button>
          </div>
        </div>
        <img
          src="/assets/svg/illustration/header-logo.svg"
          alt=""
          className="image-size"
        />
      </div>
      {/* <SubHeader/> */}
    </div>
  );
}
