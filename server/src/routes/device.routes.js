const express = require("express");

const router = express.Router();

const prisma = require("../prisma");





router.get("/", async (req, res) => {

  try {

    const devices = await prisma.device.findMany({

      orderBy: {

        id: "asc",

      },

    });

    res.json(devices);

  }

  catch (err) {

    console.error(err);

    res.status(500).json({

      message: "Failed to fetch devices",

    });

  }

});




router.post("/", async (req, res) => {

  const { name, ip } = req.body;

  try {

    const newDevice = await prisma.device.create({

      data: {

        name,

        ip,

        status: "offline",

        latency: null,

      },

    });

    res.status(201).json(newDevice);

  }

  catch (err) {

    console.error(err);

    res.status(500).json({

      message: "Failed to create device",

    });

  }

});




router.delete("/:id", async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    await prisma.device.delete({

      where: {

        id,

      },

    });

    res.json({

      message: "Device deleted successfully",

    });

  }

  catch (err) {

    console.error(err);

    res.status(500).json({

      message: "Failed to delete device",

    });

  }

});



router.put("/:id", async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const { name, ip } = req.body;

    const updatedDevice = await prisma.device.update({

      where: {

        id,

      },

      data: {

        name,

        ip,

      },

    });

    res.json(updatedDevice);

  }

  catch (err) {

    console.error(err);

    res.status(500).json({

      message: "Failed to update device",

    });

  }

});



module.exports = router;