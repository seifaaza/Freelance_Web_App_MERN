import SavedItem from "./SavedItem";
import SavedData from "./SavedData";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

export default function Saved() {
  const SavedItems = () => {
    return SavedData.map((item, index) => {
      return (
        <SavedItem
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
      <div className="flex gap-2">
        <VerifiedUserIcon />
        <p className="text-small dark:text-slate-300">
          Only you can see what you&apos;ve saved
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <SavedItems />
      </div>
    </div>
  );
}
