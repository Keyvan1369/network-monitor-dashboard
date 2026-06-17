const express = require("express");
const router = express.Router();

const devices = require("../devices");


router.get("/", (req, res) => {
  res.json(devices);
});


router.post("/", (req, res) => {
  const { name, ip } = req.body;

  const newDevice = {
    id: devices.length + 1,
    name,
    ip,
    status: "unknown",
    latency: null
  };

  devices.push(newDevice);

  res.status(201).json(newDevice);
});

module.exports = router;