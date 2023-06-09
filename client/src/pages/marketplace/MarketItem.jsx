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

export default function MarketItem(props) {
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
        className="flex flex-col gap-3 bg-white dark:bg-dark rounded p-4 max-w-sm cursor-pointer hover:scale-105 duration-300 hover:shadow-sm"
        onClick={handleOpen}
      >
        <div
          className={`h-44 rounded  bg-contain bg-no-repeat bg-center bg-[url('${props.image}')]`}
        ></div>
        <div className="flex justify-between dark:text-slate-100">
          <div>
            <h1 className="text-small-heading">{props.title}</h1>
            <h3 className="font-main text-small font-semibold"> {props.price} MAD</h3>
          </div>

          <IconButton component={Link} to="/confirmer" className="self-end">
            <ShoppingCartIcon color="warning" />
          </IconButton>
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
          className="shadow-md rounded flex flex-col laptop:flex-row w-5/6 tablet:w-2/4 h-fit justify-between"
        >
          <div
            className={`h-64 w-2/4 rounded  bg-contain bg-no-repeat bg-center bg-[url('/')]`}
          ></div>
          {addItem === false ? (
            <div className="flex flex-col justify-between w-full laptop:w-3/4 font-main">
              <div className="flex justify-between ">
                <div className="flex flex-col gap-2">
                  <h3 className="font-main text-medium">{props.title}</h3>
                  <h2 className="text-small-heading">{props.price} MAD</h2>
                  <h2 className="text-small">{props.mark}</h2>
                </div>
                <div className="flex gap-1 ">
                  <StarIcon className="text-amber-500" />
                  <p className="dark:text-white">3.2</p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <p>{props.des}</p>
                <div className="flex flex-col laptop:flex-row gap-3">
                  <Button
                    variant="outlined"
                    className="btn btn-outlined w-fit"
                    endIcon={<ShoppingBagIcon />}
                  >
                    Ajouter au panier
                  </Button>
                  <Button
                    variant="contained"
                    className="btn btn-contained w-fit"
                    endIcon={<ShoppingCartIcon />}
                    onClick={() => setAddItem("yes")}
                  >
                    Acheter
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between w-full laptop:w-3/4  font-main">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="font-main text-medium">{props.title}</h3>
                  <h2 className="text-small-heading">{props.price} MAD /1</h2>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-10">
                  <TextField
                    color="warning"
                    type="number"
                    id="outlined-basic"
                    label="Quantité"
                    variant="outlined"
                    value={quantite}
                  />

                  <div>
                    <h1>Totale :</h1>{" "}
                    <p className="text-xl font-medium">
                      {quantite * props.price} MAD
                    </p>
                  </div>
                </div>
                <div className="flex flex-col laptop:flex-row gap-3">
                  <Button
                    variant="outlined"
                    className="btn btn-outlined w-fit"
                    endIcon={<ShoppingBagIcon />}
                  >
                    Ajouter au panier
                  </Button>
                  <Button
                    to="/confirmer"
                    component={Link}
                    variant="contained"
                    className="btn btn-contained w-fit"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => setAddItem("yes")}
                  >
                    Confirmer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
}

MarketItem.propTypes = {
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  mark: PropTypes.string,
  des: PropTypes.string,
};
