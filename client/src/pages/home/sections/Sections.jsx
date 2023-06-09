// import  { useState } from "react";
import RaisonsData from "./SectionsData";
import RaisonsItem from "./SectionsItem";

export default function Sections() {
  // const [length, setLength] = useState(0);
  const RaisonItems = () => {
    return RaisonsData.map((item, index) => {
      // setLength(index +1)
      return (
        <RaisonsItem
          key={index}
          icon={item.icon}
          title={item.title}
          content={item.content}
          delay={index * 100}
        />
      );
    });
  };
  return (
    <div className="font-main py-10 px-3 flex flex-col justify-center tablet:px-2 tablet:justify-start items-center gap-8 laptop:px-0 ">
      <h1 className="h-fit text-title text-center tablet:text-large bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600  laptop:mb-5">
      Complete world for everything
      </h1>
      <div className="flex flex-wrap justify-center gap-8 tablet:text-center laptop:w-full laptop:justify-between ">
        <RaisonItems />
      </div>
    </div>
  );
}
