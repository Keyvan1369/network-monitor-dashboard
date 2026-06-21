import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar
} from "recharts";

import "./Charts.css";

function Charts({ devices }) {

  const online =
    devices.filter(d => d.status === "online").length;

  const offline =
    devices.filter(d => d.status === "offline").length;


  const pieData = [
    {
      name: "Online",
      value: online
    },
    {
      name: "Offline",
      value: offline
    }
  ];


  const latencyData = devices.map(device => ({
    name: device.name,
    latency: device.latency || 0
  }));


  return (

    <div className="charts-container">

      <div className="chart-card">

        <h3>Status Overview</h3>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >

              <Cell fill="#22c55e" />

              <Cell fill="#ef4444" />

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>


      <div className="chart-card">

        <h3>Latency</h3>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={latencyData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="latency"
              fill="#3b82f6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default Charts;