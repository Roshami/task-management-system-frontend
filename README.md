# TaskSphere - Custom Task Management Web Application

## 📃 Project Overview

TaskSphere is a versatile, full-stack task management system designed with both personal and organizational use in mind. Users can either manage their own tasks privately or sign up under a company to collaborate within teams.

It includes email verification with OTP, secure JWT authentication, task filtering, and a company admin interface to manage users and assign tasks. A dynamic dashboard displays a pie chart summarizing all task statuses.

## 📊 Live Demo

- **Frontend:** [task-management-system-frontend-gamma.vercel.app](https://task-management-system-frontend-gamma.vercel.app/)
- **Backend:** [task-management-system-backend-azxm.onrender.com](https://task-management-system-backend-azxm.onrender.com/)

## 🔗 GitHub Repositories

- **Frontend:** [task-management-system-frontend](https://github.com/Roshami/task-management-system-frontend.git)
- **Backend:** [task-management-system-backend](https://github.com/Roshami/task-management-system-backend.git)

## 🔧 Tech Stack

- **Frontend:** React.js, Redux, Axios, Tailwind CSS, Framer Motion, React Router
- **Backend:** Node.js (v20.18.0), Express.js, MongoDB, JWT
- **Auth/Security:** Nodemailer (OTP Email Verification), bcrypt (Password Hashing)

## 🚀 Features

### Personal Users

- Register with email and OTP verification
- Manage their own tasks (create, read, update, delete)
- Search and filter tasks by status, priority, etc.
- View the dashboard with task statistics (pie chart)

### Company Users

- Register with a company name to create a company account
- **Admin**:
  - Manage users within the company
  - Assign tasks to company users
  - Full task CRUD + filter/search
- **Company Users**:
  - Can view and edit their assigned tasks only
  - Search and filter assigned tasks

## 📄 Sample Accounts

| Role          | Email                                                | Password |
| ------------- | ---------------------------------------------------- | -------- |
| Admin         | [admin@gmail.com](mailto\:admin@gmail.com)           | 123      |
| Personal User | [personal@example.com](mailto\:personal@example.com) | 123      |

## 📁 Folder Structure (Simplified)

```
- /client
  - /src
    - /app
    - /components
    - /features
    - /pages
    - App.jsx
    - .env

- /server
  - /controllers
  - /models
  - /routes
  - index.js
  - .env
```

## 📆 Environment Variables

### Backend (`/server/.env`)

```
MONGO_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
AUTH_EMAIL=your_email@gmail.com
AUTH_PASSWORD=your_app_password
```

### Frontend (`/client/.env`)

```
VITE_BACKEND_URL=https://task-management-system-backend-azxm.onrender.com/api
```

## 🚧 Installation and Running Locally

### 1. Clone Repos

```bash
git clone https://github.com/Roshami/task-management-system-frontend.git
cd task-management-system-frontend
npm install
npm run dev

# In another terminal
cd ../task-management-system-backend
npm install
npm start
```

### 2. Prerequisites

- Node.js v20.18.0
- MongoDB Atlas or a local MongoDB instance
- Verified email account for Nodemailer OTP (e.g., Gmail)

### 3. Ports

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend:** [http://localhost:3000](http://localhost:3000) (proxy is configured)

## 📈 Dashboard Visualization

Includes a pie chart summarizing tasks:

- Complete
- Pending
- In Processing
- On Hold


## 🔔 Contact

For questions or contributions:

- GitHub: [Roshami](https://github.com/Roshami)
- Email: [thashmantharoshami@gmail.com](mailto\:thashmantharoshami@gmail.com)

---

> ⚠️ Make sure your `.env` files are set correctly. If we cannot run your application following the instructions, your submission will be unassessable.

