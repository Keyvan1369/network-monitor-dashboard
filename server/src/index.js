const app = require("./app");

const checkDevices = require("./services/ping.service");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);


  checkDevices();

  
  setInterval(checkDevices, 10000);
});