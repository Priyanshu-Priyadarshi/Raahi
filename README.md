<div align="center">
  <img src="Frontend/src/logos/Raahi.png" alt="Raahi Logo" width="120"/>
  <h1>Raahi 🚕</h1>
  <p><b>Modern, full-stack ride-hailing app with real-time tracking and dual user/captain flows.</b></p>
  <p>
    <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-18-blue?logo=react"/></a>
    <a href="https://nodejs.org/" target="_blank"><img src="https://img.shields.io/badge/Node.js-18-green?logo=node.js"/></a>
    <a href="https://expressjs.com/" target="_blank"><img src="https://img.shields.io/badge/Express.js-5.1.0-black?logo=express"/></a>
    <a href="https://www.mongodb.com/" target="_blank"><img src="https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb"/></a>
    <a href="https://socket.io/" target="_blank"><img src="https://img.shields.io/badge/Socket.io-4.8.1-black?logo=socket.io"/></a>
    <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwindcss"/></a>
  </p>

</div>

---

## 🚦 Demo

> <b>Local:</b> Visit http://localhost:5173 after setup (see below)

---

## ✨ Features
- 🔐 Dual flows: User (rider) & Captain (driver)
- 🔑 Authentication & protected routes
- 🚗 Real-time ride requests, acceptance, and live tracking (Socket.io)
- 🏁 Ride status management (waiting, riding, finished)
- 👤 Profile management for both users and captains
- 🧾 Receipts and ride history
- 🎨 Modern, responsive UI (Tailwind CSS)

## 🛠️ Tech Stack
- <b>Frontend:</b> React 18, Vite, Tailwind CSS
- <b>Backend:</b> Node.js 18, Express.js 5, MongoDB (Mongoose), Socket.io
- <b>Other:</b> Axios, JWT, bcrypt, dotenv

## 📁 Project Structure
<details>
<summary>📂 <b>Click to expand</b></summary>

```
Uber/
├── Backend/
│   ├── app.js
│   ├── server.js
│   ├── socket.js
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── services/
├── Frontend/
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   ├── context/
│   │   ├── logos/
│   │   ├── pages/
│   │   └── ...
│   └── ...
├── README.md
└── ...
```
</details>

## 🚀 Getting Started

<details>
<summary>📝 <b>Step-by-step Setup</b></summary>

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone <repo-url>
cd Uber
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in `Backend/`:
```env
GOOGLE_MAPS_API=your_GOOGLE_MAPS_API
DB_CONNECT=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4000
```
Start the backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```
Create a `.env` file in `Frontend/`:
```env
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_GOOGLE_MAPS_API_KEY
VITE_CONTACT_EMAIL=email_id
```
Start the frontend:
```bash
npm run dev
```
</details>

## ⚙️ Environment Variables
See above for required `.env` variables for both backend and frontend.

## 🏁 Running the App
- Backend: `npm start` (http://localhost:4000)
- Frontend: `npm run dev` (http://localhost:5173)
- Visit [http://localhost:5173](http://localhost:5173) in your browser.

## 🧭 Key Functionality

<details>
<summary>👤 <b>User Flow</b></summary>

- Register/login
- Request a ride
- Track ride in real-time
- View ride receipt

</details>

<details>
<summary>🚕 <b>Captain Flow</b></summary>

- Register/login
- Accept rides
- Live tracking
- Finish ride
- View earnings

</details>

<details>
<summary>🔄 <b>Real-Time</b></summary>

- Socket.io for live ride status and location updates

</details>

## 🎨 Customization
- Update branding/logos in `Frontend/src/logos/`
- Edit styles in Tailwind config or component CSS
- Add new features in `Backend/services/` and `Frontend/src/components/`

### How to Contribute
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📚 API Overview

> See the Backend/controllers and Backend/routes folders for detailed REST API endpoints for users, captains, and rides. Example endpoints:

| Endpoint                | Method | Description                       |
|-------------------------|--------|-----------------------------------|
| /users/register         | POST   | Register a new user               |
| /users/login            | POST   | User login                        |
| /users/profile          | GET    | Get user profile (auth required)  |
| /users/logout           | POST   | Logout user (auth required)       |
| /captains/register      | POST   | Register a new captain            |
| /captains/login         | POST   | Captain login                     |
| /captains/profile       | GET    | Get captain profile (auth req.)   |
| /captains/logout        | GET    | Logout captain (auth required)    |
| /rides/get-fare         | GET    | Get estimated fare (auth req.)    |

---

## 💡 Tips & FAQ

- Use different browsers or incognito mode to test user and captain flows simultaneously.
- MongoDB Atlas is recommended for easy cloud DB setup.
- For real-time features, ensure both backend and frontend are running.
- Customize the UI by editing Tailwind classes in components.

---

<div align="center">
  <b>Made with Priyanshu Priyadarshi</b>
</div>

