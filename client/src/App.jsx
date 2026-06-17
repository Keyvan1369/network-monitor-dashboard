import { useEffect, useState } from "react";
import api from "./services/api";
import DeviceCard from "./components/DeviceCard";
import socket from "./socket";
import "./App.css";

function App() {
  const [devices, setDevices] = useState([]);


  useEffect(() => {
    api
      .get("/devices")
      .then((res) => setDevices(res.data))
      .catch(console.error);
  }, []);


  useEffect(() => {
    socket.on("devicesUpdated", (updatedDevices) => {
      console.log("Devices updated:", updatedDevices);

      setDevices(updatedDevices);
    });

    return () => {
      socket.off("devicesUpdated");
    };
  }, []);

  const total = devices.length;

  const online = devices.filter(
    (d) => d.status === "online"
  ).length;

  const offline = total - online;

  return (
    <div className="app">
      <div className="overlay"></div>

      <header>
        <h1> Network Monitor</h1>

        <p>
          Monitor your devices in real time
        </p>
      </header>

      <section className="stats">
        <div className="stat-card">
          <h2>{total}</h2>

          <span>Total Devices</span>
        </div>

        <div className="stat-card">
          <h2>{online}</h2>

          <span> Online</span>
        </div>

        <div className="stat-card">
          <h2>{offline}</h2>

          <span> Offline</span>
        </div>
      </section>

      <section className="devices">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
          />
        ))}
      </section>
    </div>
  );
}

export default App;