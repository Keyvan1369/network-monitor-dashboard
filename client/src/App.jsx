import { useEffect, useState } from "react";
import api from "./services/api";
import DeviceCard from "./components/DeviceCard";
import AddDevice from "./components/AddDevice";
import EditDeviceModal from "./components/EditDeviceModal";
import Charts from "./components/Charts";
import socket from "./socket";

import "./App.css";

function App() {
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

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

  const handleEditClick = (device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
  };

  const filteredDevices = devices.filter(
    (device) =>
      device.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      device.ip.includes(searchQuery)
  );

  const total = devices.length;

  const online = devices.filter(
    (device) => device.status === "online"
  ).length;

  const offline = total - online;

  return (
    <div className="app">
      <div className="overlay"></div>

      <header>
        <h1>Network Monitor</h1>

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

          <span>🟢 Online</span>
        </div>

        <div className="stat-card">
          <h2>{offline}</h2>

          <span>🔴 Offline</span>
        </div>
      </section>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search devices by name or IP..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          className="search-input"
        />
      </div>

      <AddDevice />

      <section className="devices">
        {filteredDevices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onEditClick={() =>
              handleEditClick(device)
            }
          />
        ))}
      </section>

      <Charts devices={devices} />

      <EditDeviceModal
        isOpen={isModalOpen}
        device={selectedDevice}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;