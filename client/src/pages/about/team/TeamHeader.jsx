const TeamHeader = () => {
  return (
    <div className="  dark:text-white  p-4 tablet:p-6 laptop:p-8  font-main  flex flex-col laptop:flex-row items-center gap-16  ">
      <div className="flex flex-col gap-3 items-center h-fit text-slate-700 w-full text-center ">
        <h1 className="text-title tablet:text-large bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 ">
          Meet the team !
        </h1>
        <p className="text-small-heading max-w-xl laptop:max-w-md dark:text-slate-300">
          Hello World is created and maintained by a group of invaluable core
          contributors :
        </p>
      </div>
    </div>
  );
};
export default TeamHeader;
