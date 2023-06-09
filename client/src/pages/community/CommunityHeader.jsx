

const CommunityHeader = () => {
  return (
    <div className=" bg-white bg-opacity-80 backdrop-blur-lg dark:text-white dark:bg-opacity-5 p-4 tablet:p-6 laptop:p-8 bg-orange-opacity rounded-lg font-main  flex flex-col laptop:flex-row items-center laptop:items-start justifi-between gap-16  ">
      <div className="flex flex-col gap-3 h-fit text-slate-700 w-full text-center laptop:text-start ">
        <h1 className="text-title tablet:text-large bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 ">
          Discover Our Community
        </h1>
        <h1 className="text-3xl dark:text-white">
        Share experiences and forge new connections
        </h1>
        <p className="text-small-heading max-w-xl laptop:max-w-2xl dark:text-slate-300">
        Hello World Community were created to give people a dedicated place to connect, share, and get closer to the discussions they care about most.
        </p>
      </div>
      <img src="/assets/svg/illustration/community.svg" alt="" className="w-72 tablet:w-96 laptop:w-72 desktop:w-80" />
    </div>
  );
};
export default CommunityHeader;
