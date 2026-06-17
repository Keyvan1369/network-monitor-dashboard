import "./DeviceCard.css";

function DeviceCard({ device }) {

  const isOnline = device.status === "online";

  return (

    <div className="device-card">

      <div className="top">

        <div>

          <h2>{device.name}</h2>

          <p>{device.ip}</p>

        </div>

        <div

          className={`dot ${
            isOnline

              ? "online"

              : "offline"

          }`}

        />

      </div>

      <div className="info">

        <span>Status</span>

        <strong>

          {

            isOnline

            ? "🟢 Online"

            : "🔴 Offline"

          }

        </strong>

      </div>

      <div className="info">

        <span>Latency</span>

        <strong>

          {

            device.latency

            ? `${device.latency} ms`

            : "--"

          }

        </strong>

      </div>

    </div>

  );

}

export default DeviceCard;