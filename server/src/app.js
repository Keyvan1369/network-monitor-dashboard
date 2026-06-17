const express = require("express");
const cors = require("cors");

const deviceRoutes = require("./routes/device.routes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/devices", deviceRoutes);

app.get("/", (req, res) => {
  res.send("Network Monitor API is running");
});

module.exports = app;