import CreativeNetworkItem from "./CreativeNetworkItem";
import CreativeNetworkData from "./CreativeNetworkData";

export default function CreativeNetwork() {
  const CreativeNetworkItems = () => {
    return CreativeNetworkData.map((item, index) => {
      return (
        <CreativeNetworkItem
          key={index}
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
      <div className="flex flex-wrap gap-4">
        <CreativeNetworkItems />
      </div>
    </div>
  );
}
