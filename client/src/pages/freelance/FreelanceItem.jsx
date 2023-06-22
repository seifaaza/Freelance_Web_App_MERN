import PropTypes from "prop-types";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TextField from "@mui/material/TextField";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";

export default function FreelanceItem(props) {
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
        className="flex flex-col gap-3 bg-white dark:bg-dark rounded-lg py-4 px-6 max-w-sm cursor-pointer hover:scale-105 duration-300 hover:shadow-sm "
        onClick={handleOpen}
      >
        <div
          className={`h-40 w-full  rounded overflow-hidden bg-center bg-cover bg-center bg-[url('/freelance/${props.image}')]`}
        ></div>
        <div className="flex justify-between dark:text-slate-100">
          <Avatar alt={props.freelancer} />
          <div className="flex flex-col gap-1 items-end">
            <h1 className="text-small-heading">{props.title}</h1>
            <h3 className="font-main text-small font-semibold text-violet-600">
              {" "}
              {props.price} MAD
            </h3>
          </div>
        </div>
        <p className="text-small dark:text-slate-300">{props.des}</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="shadow-md rounded-lg flex flex-col w-5/6 tablet:w-2/4 h-fit justify-between gap-4 dark:bg-slate-900"
        >
          <div
            className={`h-64 w-full  rounded overflow-hidden bg-cover bg-center bg-[url('/freelance/${props.image}')]`}
          ></div>
          <div className="flex flex-col justify-between w-full laptop:w-full gap-3 font-main dark:text-slate-300">
            <div className="flex justify-between w-full">
              <div className="flex justify-center items-center gap-3 ">
                <Avatar
                  alt={props.freelancer}
                  // src="/assets/images/mohamed.jpg"
                />
                <p className="font-main text-small-heading dark:text-white">
                  {props.freelancer}
                </p>
              </div>
              <div className="flex flex-col font-main items-end dark:text-slate-300 overflow-hidden">
                <h3 className=" text-small dark:text-white overflow-hidden whitespace-nowrap text-ellipsis">
                  {props.title}
                </h3>
                <h2 className="text-small-heading text-violet-600 font-medium">
                  {props.price} MAD
                </h2>
              </div>
              {/* <div className="flex gap-1 ">
                <StarIcon className="text-violet-600" />
                <p className="dark:text-white">3.2</p>
              </div> */}
            </div>
            <div className="flex flex-col gap-5">
              <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                {props.des}
              </p>
              <div className="flex flex-col laptop:flex-row gap-3">
                <Link
                  onClick={() => {
                    window.location.href = `mailto:${props.email}`;
                  }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    className="btn btn-contained w-fit"
                    endIcon={<MailIcon />}
                    onClick={() => setAddItem("yes")}
                  >
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

FreelanceItem.propTypes = {
  freelancer: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  mark: PropTypes.string,
  des: PropTypes.string,
};
