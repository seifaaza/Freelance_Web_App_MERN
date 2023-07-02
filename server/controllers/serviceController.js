const Services = require("../models/service");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");

const fetchServices = async (req, res) => {
  const services = await Services.find();
  res.json({ services: services });
};

const fetchService = async (req, res) => {
    serviceId =  req.params.id;
  const service = await Services.findById(serviceId);
  res.json({ service: service });
};

const createService = async (req, res) => {
    try {
    const image = !req.file ? "avatar"  : req.file.filename ;
    const {title, des, price} = req.body;
    const service = await Services.create({title, des, price, image})
    res.json({ service: service })
    }catch(err){
      console.log(err)
      res.sendStatus(400)
    }
  }

const deleteService = async (req, res) => {
  const serviceId = req.params.id;
  await Services.findByIdAndDelete(serviceId);
  res.json({ success: "record deleted" });
};

module.exports = {
    fetchService: fetchService,
    fetchServices: fetchServices,
    createService : createService,
    deleteService: deleteService
};


