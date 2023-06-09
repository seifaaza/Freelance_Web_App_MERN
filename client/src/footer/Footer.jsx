// import SocialMediaData from "./SocialMediaData";
// import SocialMediaItem from "./SocialMediaItem";
import FooterLinks from "./FooterLinks";
import { Link } from "react-router-dom";


export default function Footer() {
  // const SocialMediaItems = () => {
  //   return SocialMediaData.map((item, index) => {
  //     return <SocialMediaItem key={index} icon={item.icon} url={item.url} />;
  //   });
  // };

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg dark:bg-opacity-5 relative z-40">
      <div className="main-container font-main h-full py-16 px-3 flex flex-col justify-between tablet:px-8 gap-12 laptop:px-0">
        <div className="flex flex-col laptop:flex-row gap-8 text-small-heading dark:text-white laptop:justify-between">
          <div className="flex flex-col items-center gap-2 laptop:items-start">
            <img
              src="/assets/svg/logo/logo-2.svg"
              alt="Logo de Quick Bricolage"
              className="w-36 h-fit mb-2"
            />
            <span className="text-violet-600">Launch Now, Rise Forever !</span>
           
          </div>
          <div className="flex flex-wrap gap-8 px-10 tablet:px-0 tablet:justify-center tablet:gap-10 laptop:gap-14 laptop:flex-nowrap">
            <FooterLinks />
          </div>
        </div>
        <hr className=" border-slate-700 rounded border-opacity-30" />
        <div className="flex flex-col text-center gap-5 justify-between w-full text-small text-slate-700 dark:text-slate-300 tablet:flex-row laptop:text-start">
          <span>© 2023 Hello World. All Rights Reserved</span>
          <ul className="flex flex-col items-center gap-2 laptop:flex-row tablet:items-start laptop:gap-8">
            <li>
              <Link
                to="/"
                className="relative btn-hover btn-underline w-fit h-fit"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="relative btn-hover btn-underline w-fit h-fit"
              >
                Terms and conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

