<div align="center">
  <img src="Frontend/src/logos/Raahi.png" alt="Raahi Logo" width="120"/>
  <h1>Raahi - Uber Clone 🚕</h1>
  <p><b>Modern, full-stack ride-hailing app with real-time tracking and dual user/captain flows.</b></p>
  <p>
    <img src="https://img.shields.io/badge/React-18-blue?logo=react"/>
    <img src="https://img.shields.io/badge/Node.js-18-green?logo=node.js"/>
    <img src="https://img.shields.io/badge/Express.js-5.1.0-black?logo=express"/>
    <img src="https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb"/>
    <img src="https://img.shields.io/badge/Socket.io-4.8.1-black?logo=socket.io"/>
    <img src="https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwindcss"/>
  </p>
  <p>
    <a href="#demo">Live Demo</a> •
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#api-overview">API Overview</a> •
    <a href="#contributing">Contribute</a>
  </p>
</div>

---

## 🚦 Demo

> <b>Local:</b> Visit http://localhost:5173 after setup (see below)

---

## ✨ Features
- Dual flows: User (rider) & Captain (driver)
- Authentication & protected routes
- Real-time ride requests, acceptance, and live tracking (Socket.io)
- Ride status management (waiting, riding, finished)
- Profile management for both users and captains
- Receipts and ride history
- Modern, responsive UI (Tailwind CSS)

## 🛠️ Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** Node.js 18, Express.js 5, MongoDB (Mongoose), Socket.io
- **Other:** Axios, JWT, bcrypt, dotenv

## 📁 Project Structure
<details>
<summary>Click to expand</summary>

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
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
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
VITE_BASE_URL=http://localhost:5000
```
Start the frontend:
```bash
npm run dev
```

## ⚙️ Environment Variables
See above for required `.env` variables for both backend and frontend.

## 🏁 Running the App
- Backend: `npm start` (http://localhost:5000)
- Frontend: `npm run dev` (http://localhost:5173)
- Visit [http://localhost:5173](http://localhost:5173) in your browser.

## 🧭 Key Functionality

### User Flow
- Register/login
- Request a ride
- Track ride in real-time
- View ride receipt

### Captain Flow
- Register/login
- Accept rides
- Live tracking
- Finish ride
- View earnings

### Real-Time
- Socket.io for live ride status and location updates

## 🎨 Customization
- Update branding/logos in `Frontend/src/logos/`
- Edit styles in Tailwind config or component CSS
- Add new features in `Backend/services/` and `Frontend/src/components/`

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

### How to Contribute
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License
[MIT](LICENSE)

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
  <b>Made with ❤️ by the Raahi Team</b>
</div>

