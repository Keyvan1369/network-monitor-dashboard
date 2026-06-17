const http = require("http");

const { Server } = require("socket.io");

const app = require("./app");

const checkDevices = require("./services/ping.service");

const PORT = 3000;

const server = http.createServer(app);

const io = new Server(server, {

  cors: {

    origin: "http://localhost:5173",

    methods: ["GET", "POST"]

  }

});

app.set("io", io);

io.on("connection", (socket) => {

  console.log("Client connected");

  socket.on("disconnect", () => {

    console.log("Client disconnected");

  });

});

server.listen(PORT, () => {

  console.log(`Server running on ${PORT}`);

  checkDevices(io);

  setInterval(() => {

    checkDevices(io);

  }, 10000);

});