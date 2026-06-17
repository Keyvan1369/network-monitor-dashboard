import { useEffect, useState } from "react";
import api from "./services/api";

function App() {

  const [devices, setDevices] = useState([]);

  useEffect(() => {

    api.get("/devices")
      .then((res) => {

        setDevices(res.data);

      })
      .catch((err) => {

        console.error(err);

      });

  }, []);

  return (

    <div>

      <h1>Network Monitor Dashboard</h1>

      {devices.map((device) => (

        <div key={device.id}>

          <h3>{device.name}</h3>

          <p>{device.ip}</p>

          <p>Status: {device.status}</p>

          <p>Latency: {device.latency}</p>

          <hr />

        </div>

      ))}

    </div>

  );
}

export default App;