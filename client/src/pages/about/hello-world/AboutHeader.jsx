const AboutHeader = () => {
  return (
    <div className=" bg-white bg-opacity-80 backdrop-blur-lg dark:text-white dark:bg-opacity-5 p-4 tablet:p-6 laptop:p-8 bg-orange-opacity rounded-lg font-main  flex flex-col laptop:flex-row items-center laptop:items-start justify-between gap-16  ">
      <div className="flex flex-col gap-3 h-fit text-slate-700 w-full text-center laptop:text-start ">
        <h1 className="text-title tablet:text-large bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 ">
          Why Hello World ?
        </h1>
        <p className="text-small-heading max-w-xl laptop:max-w-2xl dark:text-slate-300">
          Hello World give you several features and options to facilitate and
          speed up your operations, the most important of which is easy access
          to the various site services
        </p>
      </div>
      <img
        src="/assets/svg/illustration/about-hello-world.svg"
        alt=""
        className="w-72 tablet:w-96 laptop:w-72 desktop:w-80"
      />
    </div>
  );
};
export default AboutHeader;
