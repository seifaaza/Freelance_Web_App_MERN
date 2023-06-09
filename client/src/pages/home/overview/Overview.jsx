export default function Overview() {
  return (
    <div className=" font-main py-8 px-3 flex flex-col justify-center tablet:px-8 tablet:justify-start gap-8 laptop:px-0 ">
      <div className="font-main flex flex-col laptop:flex-row items-center laptop:items-start justify-between gap-10 ">
        <div
          className="flex flex-col text-center laptop:text-start dark:text-white  gap-8  bg-orange-opacity font-main text-slate-700"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <h1 className="text-title tablet:text-large bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 ">
            Hello World overview
          </h1>
          <p className="text-small-heading rounded-lg  tablet:max-w-2xl ">
          Hello World intends to expedite tasks for freelancers and clients, providing seamless user experiences, services, and a collaborative community.
          </p>
        </div>
        <img
          src="/assets/svg/illustration/overview.svg"
          alt=""
          className="w-80 laptop:w-72 desktop:w-96"
          data-aos="fade-up"
          data-aos-delay="500"
        />
      </div>
      ;
    </div>
  );
}
