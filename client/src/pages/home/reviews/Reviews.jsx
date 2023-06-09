import ReviewsItem from "./ReviewsItem";
import ReviewsData from "./ReviewsData";

export default function Reviews() {
  const ReviewsItems = () => {
    return ReviewsData.map((item, index) => {
      return (
        <ReviewsItem
          key={index}
          name={item.name}
          country={item.country}
          image={item.image}
          rating={item.rating}
          review={item.review}
          delay={index * 100}
        />
      );
    });
  };
  return (
    <div className=" font-main py-8 px-3 flex flex-col justify-center tablet:px-8 tablet:justify-start items-center gap-8 laptop:px-0 ">
      <h1 className="h-fit text-title text-center tablet:text-large bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 laptop:mb-5">
      What our customers say?
      </h1>
      <div className="flex flex-col gap-5 laptop:flex-row laptop:gap-8">
        <ReviewsItems />
      </div>
    </div>
  );
}
