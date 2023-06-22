import MyBagItem from "./MyBagItem";
import MyBagData from "./MyBagData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

export default function MyBagplace() {
  const MyBagItems = () => {
    return MyBagData.map((item, index) => {
      return (
        <MyBagItem
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
      <Button
        variant="contained"
        className="btn btn-contained w-fit"
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>

      <div className="flex flex-wrap gap-8">
        <MyBagItems />
      </div>
    </div>
  );
}
