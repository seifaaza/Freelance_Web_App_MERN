import Filter from "./Filter";
import MarketItem from "./MarketItem";
import MarketData from "./MarketItemData";

export default function Marketplace() {
  const MarketItems = () => {
    return MarketData.map((item, index) => {
      return (
        <MarketItem
          key={index}
          freelancer={item.freelancer}
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
      {/* <Filter /> */}
      <div className="flex flex-wrap gap-8">
        <MarketItems />
      </div>
    </div>
  );
}
