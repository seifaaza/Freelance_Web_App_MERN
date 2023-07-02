import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import serviceStore from "../stores/ServiceStore";

export default function Freelance() {
  const store = serviceStore();

  //   useEffect(() => {
  //     store.fetchService();
  //   }, []);

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`h-64 w-full rounded rounded-b-none overflow-hidden bg-cover bg-center bg-[url('http://localhost:3000/uploads/${store.showForm.image}')]`}
      ></div>
      <div className="flex flex-col justify-between w-full laptop:w-full gap-3 font-main dark:text-slate-300 p-8">
        <div className="flex justify-between w-full">
          <div className="flex justify-center items-center gap-3 ">
            <Avatar alt="freelancer" src="/assets/images/mohamed.jpg" />
            <p className="font-main text-small-heading dark:text-white">
              freelancer
            </p>
          </div>
          <div className="flex flex-col font-main items-end dark:text-slate-300 overflow-hidden">
            <h3 className=" text-small dark:text-white overflow-hidden whitespace-nowrap text-ellipsis">
              {store.showForm && store.showForm.title}
            </h3>
            <h2 className="text-small-heading text-violet-600 font-medium">
              {store.showForm && store.showForm.price} MAD
            </h2>
          </div>
          {/* <div className="flex gap-1 ">
          <StarIcon className="text-violet-600" />
          <p className="dark:text-white">3.2</p>
        </div> */}
        </div>
        <div className="flex flex-col gap-5">
          <p className="overflow-hidden whitespace-nowrap text-ellipsis">
            {store.showForm && store.showForm.des}
          </p>
          <div className="flex flex-col laptop:flex-row gap-3">
            <Link
              onClick={() => {
                window.location.href = `mailto:s@gmail.com`;
              }}
            >
              <Button
                size="large"
                variant="contained"
                className="btn btn-contained w-fit"
                endIcon={<MailIcon />}
              >
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
