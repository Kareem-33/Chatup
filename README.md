
# 🗨️ Chatup

A full-stack **MERN** chat application enabling real-time messaging and interactive chat rooms.

---

## 🔧 Features

- **User Authentication**: Sign up, log in, and secure password handling.
- **Real-Time Chat**: Live messaging powered by Socket.io.
- **Message Persistence**: Conversations stored in MongoDB for history retrieval.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Socket.io Client
- **Backend**: Node.js, Express, Socket.io Server
- **Database**: MongoDB + Mongoose
- **Auth**: JWT-based authentication with secure password storage

---

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/Kareem-33/Chatup.git
   cd Chatup
   ```

2. Install dependencies:

   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Set environment variables:

   Create `.env` files in both `server/` and `client/`, for example:

   **server/.env**

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatup
   JWT_SECRET=your_jwt_secret
   ```

   **client/.env**

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Run the app:

   - **Backend** (from `server/`):
     ```bash
     npm run dev
     ```

   - **Frontend** (from `client/`):
     ```bash
     npm start
     ```

Visit `http://localhost:3000` in your browser to use Chatup locally.

---

## 📁 Project Structure

```
Chatup/
├── client/           # React frontend
│   ├── src/
│   └── public/
├── server/           # Express + Socket.io backend
│   ├── controllers/
│   ├── models/
│   └── routes/
├── README.md         # This file
└── .gitignore
```

---

## ❤️ Contributing

1. Fork the repository
2. Create your feature branch (e.g., `feature/new-message-ui`)
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-message-ui`
5. Open a pull request

Please ensure all tests pass and adhere to the project's coding style.

---

## 🧑‍💻 Author

**Kareem Refaat** – [GitHub Profile](https://github.com/Kareem-33)
