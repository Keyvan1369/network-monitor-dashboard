import { useState } from "react";
import api from "../services/api";

function AddDevice() {
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !ip) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/devices", {
        name,
        ip,
      });

      setName("");
      setIp("");

      alert("Device added successfully!");
    } catch (err) {
      console.error(err);

      alert("Failed to add device");
    }
  };

  return (
    <form
      className="add-device-form"
      onSubmit={handleSubmit}
    >
      <h2>Add Device</h2>

      <input
        type="text"
        placeholder="Device Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="IP Address"
        value={ip}
        onChange={(e) =>
          setIp(e.target.value)
        }
      />

      <button type="submit">
        + Add Device
      </button>
    </form>
  );
}

export default AddDevice;