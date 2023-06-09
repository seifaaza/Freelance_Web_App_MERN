
import MieuxItem from "./FeaturesItem";
import MieuxData from "./FeaturesData";

export default function Features() {
  const MieuxItems = () => {
    return MieuxData.map((item, index) => {
      return (
        <MieuxItem
          key={index}
          icon={item.icon}
          title={item.title}
          textColor= {item.textColor}
          borderColor={item.borderColor}
          description={item.description}
          delay={index * 100}
        />
      );
    });
  };
  return (
    <div className="font-main py-10 px-3 flex flex-col justify-center tablet:justify-start items-center gap-8 tablet:px-2 ">
      <h1 className="h-fit text-title text-center tablet:text-large bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 laptop:mb-5">
        Features at your <span className="whitespace-nowrap">fingertips !</span>
      </h1>
      <div className="flex flex-col w-full justify-between tablet:flex-row-reverse items-center gap-10">
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-5">
          <MieuxItems />
        </div>
      </div>
    </div>
  );
}
