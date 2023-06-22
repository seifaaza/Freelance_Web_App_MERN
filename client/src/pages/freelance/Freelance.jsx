import FreelanceItem from "./FreelanceItem";
import FreelanceData from "./FreelaneItemData";

export default function Freelance() {
  const FreelanceItems = () => {
    return FreelanceData.map((item, index) => {
      return (
        <FreelanceItem
          key={index}
          freelancer={item.freelancer}
          email={item.email}
          title={item.title}
          price={item.price}
          image={item.image}
          des={item.des}
        />
      );
    });
  };

  return (
    <div className="flex flex-col gap-6 tablet:gap-10 z-10 tablet:py-10 font-main  text-slate-700 text-title">
      <div className="flex flex-wrap gap-8">
        <FreelanceItems />
      </div>
    </div>
  );
}
