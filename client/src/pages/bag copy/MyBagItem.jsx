import PropTypes from "prop-types";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TextField from "@mui/material/TextField";

export default function MyBagItem(props) {
  const [open, setOpen] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 4,
  };

  return (
    <>
      <div
        className="flex flex-col justify-between gap-3 bg-white dark:bg-dark rounded-lg py-4 px-6 max-w-sm cursor-pointer hover:scale-105 duration-300 hover:shadow-sm "
        onClick={handleOpen}
      >
        <div
          className={`h-40 w-60 rounded  bg-contain bg-no-repeat bg-center bg-[url('${props.image}')]`}
        ></div>
        <div className="flex justify-between dark:text-slate-100">
          <p className="text-small ">{props.title}</p>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="shadow-md rounded-lg flex flex-col laptop:flex-row w-5/6 tablet:w-2/4 h-fit justify-between"
        >
          <div
            className={`h-64 w-2/4 rounded  bg-contain bg-no-repeat bg-center bg-[url('/')]`}
          ></div>
          <div className="flex flex-col justify-between w-full laptop:w-3/4 font-main">
            <div className="flex justify-between ">
              <div className="flex flex-col gap-2">
                <h3 className="font-main text-medium">{props.title}</h3>
                <h2 className="text-small-heading">{props.price} MAD</h2>
                <h2 className="text-small">{props.mark}</h2>
              </div>
              {/* <div className="flex gap-1 ">
                <StarIcon className="text-violet-600" />
                <p className="dark:text-white">3.2</p>
              </div> */}
            </div>
            <div className="flex flex-col gap-5">
              <p>{props.des}</p>
              <div className="flex flex-col laptop:flex-row gap-3">
                <Button
                  size="large"
                  variant="outlined"
                  className="btn btn-outlined w-fit"
                  endIcon={<ShoppingBagIcon />}
                >
                  Add to bag
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  className="btn btn-contained w-fit"
                  endIcon={<ShoppingCartIcon />}
                  onClick={() => setAddItem("yes")}
                >
                  Buy
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

MyBagItem.propTypes = {
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  mark: PropTypes.string,
  des: PropTypes.string,
};
