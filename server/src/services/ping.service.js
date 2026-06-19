const ping = require("ping");
const prisma = require("../prisma");

const checkDevices = async (io) => {
  console.log("Checking devices...");

  try {
    const devices = await prisma.device.findMany();

    if (devices.length === 0) {
      console.log("No devices found");
      return;
    }

    for (const device of devices) {
      try {
        const result = await ping.promise.probe(device.ip);

        const updated = await prisma.device.update({
          where: {
            id: device.id,
          },

          data: {
            status: result.alive
              ? "online"
              : "offline",

            latency: result.alive
              ? parseFloat(result.time)
              : null,
          },
        });

        console.log(
          `${updated.name}: ${updated.status} (${updated.latency} ms)`
        );
      } catch (err) {
        console.error(
          `Error pinging ${device.name}:`,
          err.message
        );

        await prisma.device.update({
          where: {
            id: device.id,
          },

          data: {
            status: "offline",

            latency: null,
          },
        });
      }
    }

    
    const updatedDevices =
      await prisma.device.findMany({
        orderBy: {
          id: "asc",
        },
      });

    if (io) {
      io.emit(
        "devicesUpdated",
        updatedDevices
      );
    }
  } catch (err) {
    console.error(
      "Error checking devices:",
      err.message
    );
  }
};

module.exports = checkDevices;