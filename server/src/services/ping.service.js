const ping = require("ping");
const prisma = require("../prisma");

const checkDevices = async (io) => {
  console.log("Checking devices...");

  const devices = await prisma.device.findMany();

  for (const device of devices) {
    try {
      const result = await ping.promise.probe(device.ip);

      const updated = await prisma.device.update({
        where: { id: device.id },
        data: {
          status: result.alive ? "online" : "offline",
          latency: result.alive ? parseFloat(result.time) : null,
        },
      });

      console.log(
        `${updated.name}: ${updated.status} (${updated.latency})`
      );
    } catch (err) {
      console.error(err);

      await prisma.device.update({
        where: { id: device.id },
        data: {
          status: "offline",
          latency: null,
        },
      });
    }
  }

  const updatedDevices = await prisma.device.findMany();

  if (io) {
    io.emit("devicesUpdated", updatedDevices);
  }
};

module.exports = checkDevices;