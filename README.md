# Team Task Management System 

A full-stack Team Task Management System developed using the MERN Stack.  
This application helps teams efficiently manage projects, assign tasks, track progress, and monitor team performance through Admin and Member dashboards.

---

 Features
Authentication System
- User Registration & Login
- JWT Authentication
- Role-Based Access Control
- Admin & Member Roles

---

 Admin Dashboard Features

- View Project Analytics
- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks
- Overdue Tasks
- Assign Tasks to Members
  


 Member Dashboard Features

- View Assigned Tasks
- Update Task Status
- Track Pending Tasks
- Track Completed Tasks
- Responsive UI

---

 Tech Stack

 Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

 Deployment
- Railway (Backend)
- MongoDB Atlas (Database)

---

 Project Structure

```bash
project/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
```

---

 Installation

 Clone Repository

```bash
git clone https://github.com/Nikhil-379/Task-management-system.git
```

---

 Backend Setup

```bash
cd backend
npm install
npm run server
```

---

 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

 Environment Variables

Create `.env` file inside backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

Live Backend URL

```text
https://task-management-system-production-88e3.up.railway.app
```

 Admin Dashboard
- Analytics Cards
- Task Assignment
- History Page

 Member Dashboard
- Assigned Tasks
- Task Status Tracking


---------------------------------------------------------------------------------------------------------------------

This project is developed for educational and learning purposes.
