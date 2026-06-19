import api from "../services/api";
import "./DeviceCard.css";

function DeviceCard({ device }) {

  const handleDelete = async () => {

    const confirmed = window.confirm(

      `Delete ${device.name}?`

    );

    if (!confirmed) return;

    try {

      await api.delete(

        `/devices/${device.id}`

      );

    }

    catch (err) {

      console.error(err);

      alert("Failed to delete device");

    }

  };

  return (

    <div className="device-card">

      <button

        className="delete-btn"

        onClick={handleDelete}

      >

        🗑

      </button>

      <h2>

        {device.name}

      </h2>

      <p>

        {device.ip}

      </p>

      <div

        className={`status ${device.status}`}

      >

        {

          device.status === "online"

          ? "🟢 Online"

          : "🔴 Offline"

        }

      </div>

      {

        device.latency && (

          <p className="latency">

            {device.latency} ms

          </p>

        )

      }

    </div>

  );

}

export default DeviceCard;