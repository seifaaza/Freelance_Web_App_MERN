import { useState } from "react";
import SignUp from "../../modals/account/SignUp";
import Login from "../../modals/account/Login";

export default function Started() {
  const [signSwitch, setSignSwitch] = useState("");
  const SignSwitch = (SignEvent) => {
    setSignSwitch(SignEvent);
  };

  return (
    <div className="flex flex-col gap-6 tablet:gap-10 z-10 tablet:pt-8">
      <div className="font-main py-10 laptop:py-20 px-3 flex flex-col laptop:flex-row  gap-10 laptop:gap-32 tablet:px-8  laptop:px-20 ">
        <div className="flex flex-col gap-3 h-fit text-slate-700 text-center laptop:text-start w-full ">
          <h1 className="text-title font-title tablet:text-large bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 ">
            Join Us, Let’s Grow{" "}
            <span className="whitespace-nowrap"> Together !</span>
          </h1>

          <p className="text-small-heading dark:text-slate-300"></p>
        </div>
        {signSwitch === "signUp" || signSwitch === "" ? (
          <SignUp SignSwitch={SignSwitch} />
        ) : signSwitch === "login" ? (
          <Login SignSwitch={SignSwitch} />
        ) : null}
      </div>
    </div>
  );
}
