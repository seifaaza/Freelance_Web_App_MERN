import MultiservicesData from "./MultiservicesData";
import MultiservicesItem from "./MultiservicesItem";

const Multiservices = () => {
  const MultiservicesItems = () => {
    return MultiservicesData.map((item, index) => {
      // setLength(index +1)
      return (
        <MultiservicesItem
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
        Super app
      </h1>
      <div className="grid grid-cols-1 laptop:grid-cols-3 gap-14 tablet:text-center justify-center ">
        <MultiservicesItems />
      </div>
    </div>
  );
};
export default Multiservices;
