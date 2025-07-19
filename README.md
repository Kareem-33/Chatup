# Chatup 💬

Chatup is a modern real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. It provides a fast, elegant, and responsive interface for chatting in real time.

---

## 🔧 Features

- **User Authentication**: Sign up, log in, and secure password handling.
- **Real-Time Chat**: Live messaging powered by Socket.io.
- **Message Persistence**: Conversations stored in MongoDB for history retrieval.
- **32 Chat Themes**: Users can choose from 32 unique themes to personalize their experience.
- **Profile Settings**: Users can update their username, avatar, and manage account preferences.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Clean UI/UX**: Sleek interface using Tailwind CSS and Framer Motion.

---

## 🛠️ Tech Stack

**Frontend:**

- React
- TailwindCSS
- Framer Motion
- Lucide Icons

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO

---

## 📦 Installation

1. Clone the repo:

```bash
git clone https://github.com/Kareem-33/Chatup.git
```

2. Install dependencies:

```bash
cd Chatup
npm install
cd client
npm install
```

3. Add `.env` files in both root and client folders. Include MongoDB URI, JWT Secret, etc.

4. Run the app:

```bash
# Start backend
npm run dev

# In another terminal, start frontend
cd client
npm start
```

---

## 📂 Folder Structure

```
Chatup/
├── client/        # React frontend
├── server/        # Express backend
├── models/        # Mongoose schemas
├── routes/        # API routes
├── controllers/   # Route logic
├── config/        # Configuration files
└── README.md
```

---

## 📄 License

This project is licensed under the MIT License.

