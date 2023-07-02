import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import ServiceModal from "../../modals/ServiceModal";
import serviceStore from "../../stores/ServiceStore";

export default function Freelance() {
  const [open, setOpen] = useState(false);
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

  const store = serviceStore();

  useEffect(() => {
    store.fetchServices();
  }, []);

  return (
    <div className="flex flex-col gap-6 tablet:gap-10 z-10 tablet:py-10 font-main  text-slate-700 text-title">
      <div className="flex flex-wrap gap-8">
        {/* <FreelanceItems /> */}
        {store.services &&
          store.services.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  store.toggleShow(item);
                }}
              >
                <div className="flex flex-col gap-3 bg-white dark:bg-dark rounded-lg py-4 px-6 max-w-sm cursor-pointer hover:scale-105 duration-300 hover:shadow-sm ">
                  <div
                    className={`h-40 w-full rounded overflow-hidden bg-cover bg-center bg-[url('http://localhost:3000/uploads/${item.image}')]`}
                  ></div>
                  <div className="flex justify-between dark:text-slate-100">
                    <Avatar alt="test" />
                    <div className="flex flex-col gap-1 items-end">
                      <h1 className="text-small-heading">{item.title}</h1>
                      <h3 className="font-main text-small font-semibold text-violet-600">
                        {" "}
                        {item.price} MAD
                      </h3>
                    </div>
                  </div>
                  <p className="text-small dark:text-slate-300">{item.des}</p>
                </div>
              </div>
            );
          })}
        <Modal
          open={store.modalOpen}
          onClose={store.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            className="shadow-md rounded-lg flex flex-col w-5/6 tablet:w-2/4 h-fit justify-between gap-4 dark:bg-slate-900"
          >
            <ServiceModal />
          </Box>
        </Modal>
      </div>
    </div>
  );
}
