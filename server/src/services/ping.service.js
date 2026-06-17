const ping = require("ping");
const devices = require("../devices");

const checkDevices = async () => {
  console.log("Checking devices...");

  for (const device of devices) {
    try {
      const result = await ping.promise.probe(device.ip);

      device.status = result.alive ? "online" : "offline";

      device.latency = result.alive
        ? parseFloat(result.time)
        : null;

      console.log(
        `${device.name}: ${device.status} (${device.latency} ms)`
      );
    } catch (err) {
      console.error(err);

      device.status = "offline";
      device.latency = null;
    }
  }
};

module.exports = checkDevices;