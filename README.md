Network Monitor Dashboard

A full-stack network monitoring dashboard built with React, Express.js, PostgreSQL, Prisma, Socket.IO, and Docker.

The application monitors devices in real time, displays their connectivity status and latency, and provides a modern dashboard interface for managing network devices.

Features
Real-time device monitoring
Online and offline status detection
Latency measurement using ICMP ping
Add new devices
Edit existing devices
Delete devices
Search devices by name or IP address
Live statistics and charts
Real-time updates with Socket.IO
Dockerized development environment

## 📸 Screenshots

<p align="center">
  <img src="./screenshots/dashboard.png" width="45%">
  <img src="./screenshots/charts.png" width="45%">
</p>

<p align="center">
  <img src="./screenshots/add-device.png" width="45%">
  <img src="./screenshots/edit-device.png" width="45%">
</p>

Technology Stack
Frontend
React
Vite
Axios
Socket.IO Client
Recharts
CSS3
Backend
Node.js
Express.js
Prisma ORM
Socket.IO
Ping
Database
PostgreSQL
DevOps
Docker
Docker Compose

Installation
Clone the repository
git clone https://github.com/yourusername/network-monitor-dashboard.git

cd network-monitor-dashboard
Start with Docker
docker compose up --build

The application will be available at:

Service	URL
Frontend	http://localhost:5173
Backend API	http://localhost:3000
PostgreSQL	localhost:5432

Database Schema
model Device {

  id        Int      @id @default(autoincrement())

  name      String

  ip        String

  status    String

  latency   Float?

}

Future Improvements
Historical latency tracking
Device groups and tags
Authentication and authorization
Notification system
Dark and light themes
Deployment to cloud platforms
Mobile responsive layout

Author

Keyvan Hojabr

Full Stack Developer

This project was developed as a modern network monitoring solution using React, Node.js, PostgreSQL, Prisma, and Docker.