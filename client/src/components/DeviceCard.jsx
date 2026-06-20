import api from "../services/api";
import "./DeviceCard.css";

function DeviceCard({ device, onEditClick }) {

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmed = window.confirm(`Delete ${device.name}?`);
    if (!confirmed) return;

    try {
      await api.delete(`/devices/${device.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to delete device");
    }
  };

  return (
    <div className="device-card" onClick={onEditClick} style={{ cursor: 'pointer' }}>
      <button className="delete-btn" onClick={handleDelete} title="Delete Device">
        ✕
      </button>

      <h2>{device.name}</h2>
      <p className="device-ip">{device.ip}</p>

      <div className="status-container">
        <div className={`status-badge ${device.status}`}>
          <span className="dot"></span>
          {device.status === "online" ? "Online" : "Offline"}
        </div>

        {device.latency && (
          <div className="latency-badge">
            <span>⚡</span> {device.latency} ms
          </div>
        )}
      </div>
    </div>
  );
}

export default DeviceCard;