import SubHeaderData from "./SubHeaderData";

export default function SubHeader() {
  return (
    <div className="font-main flex justify-center gap-16 ">
      {SubHeaderData.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-slate-700 dark:text-white gap-2 "
          >
            <img
              src={`/assets/svg/icons/${item.icon}.svg`}
              className=" h-fit w-20 opacity-40"
            />
          </div>
        );
      })}
    </div>
  );
}
