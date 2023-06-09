import AllInOneData from "./AllInOneData";
import AllInOneItem from "./AllInOneItem";

const AllInOne = () => {
  const AllInOneItems = () => {
    return AllInOneData.map((item, index) => {
      // setLength(index +1)
      return (
        <AllInOneItem
          key={index}
          icon={item.icon}
          title={item.title}
          content={item.content}
        />
      );
    });
  };
  return (
    <div className="py-6 font-main px-3 flex flex-col justify-center tablet:px-8 tablet:justify-start items-center gap-6 laptop:px-0 ">
      <h1 className="h-fit text-title text-center tablet:text-large bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 laptop:mb-5">
        All in one
      </h1>
   
      <div className="flex flex-col justify-center gap-8 laptop:gap-16 tablet:flex-row  laptop:w-full ">
        <AllInOneItems />
      </div>
    </div>
  );
};
export default AllInOne;
