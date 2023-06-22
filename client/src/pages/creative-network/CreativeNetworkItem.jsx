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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function CreativeNetworkItem(props) {
  const [open, setOpen] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

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
        className="flex flex-col  gap-3 bg-white dark:bg-dark rounded-lg py-2 px-3  max-w-sm "
        onClick={handleOpen}
      >
        <div
          className={`h-40 w-60 rounded bg-cover bg-center bg-[url('/creative-network/${props.image}')]`}
        ></div>
        <div className="flex justify-between items-center  dark:text-slate-100">
          <p className="text-small ">{props.title}</p>
          <div>
            <IconButton
              aria-label="fingerprint"
              color="secondary"
              onClick={() => setLike(!like)}
            >
              {like ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorderIcon color="secondary" />
              )}
            </IconButton>
            <IconButton
              aria-label="fingerprint"
              color="secondary"
              onClick={() => setSave(!save)}
            >
              {save ? (
                <BookmarkIcon color="secondary" />
              ) : (
                <BookmarkBorderIcon color="secondary" />
              )}
            </IconButton>
          </div>
        </div>
      </div>

      {/* <Modal
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
              <div className="flex gap-1 ">
                <StarIcon className="text-violet-600" />
                <p className="dark:text-white">3.2</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p>{props.des}</p>
              <div className="flex flex-col laptop:flex-row gap-3"></div>
            </div>
          </div>
        </Box>
      </Modal> */}
    </>
  );
}

CreativeNetworkItem.propTypes = {
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  mark: PropTypes.string,
  des: PropTypes.string,
};
