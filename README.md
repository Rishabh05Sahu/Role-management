
# **User Management Dashboard (Role-Based Access Control)**

## **Project Overview**

The **User Management Dashboard** is a web application designed to manage users, their roles, and permissions within an organization. The system implements **Role-Based Access Control (RBAC)**, allowing administrators to control user access to various parts of the application based on their assigned roles. It provides an easy-to-use interface for managing users, assigning roles, and configuring permissions.

The project is built with **React** for the frontend, **Node.js/Express** for the backend, and it integrates with a **MongoDB** database for storing user data and role information.

### **Deployed Project**

You can view the deployed project at:
[User Management Dashboard (Deployed)](https://user-management-dashboard-rosy.vercel.app)

---

## **Project Setup**

### **Frontend Setup**

To get started with the frontend, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Rishabh05Sahu/Role-management.git
   cd user-management-dashboard
   ```

2. **Navigate to the `frontend` directory:**

   ```bash
   cd frontend
   ```

3. **Add the `.env` file in the `frontend` folder:**

   Create a `.env` file and set the `REACT_APP_BACKEND_URL` environment variable:

   ```env
   REACT_APP_BACKEND_URL="http://localhost:4000"
   ```

   If you want to use the deployed backend, you can use the following URL:

   ```env
   REACT_APP_BACKEND_URL="https://user-management-backend-ten.vercel.app/"
   ```

4. **Install the dependencies:**

   ```bash
   npm install
   ```

5. **Start the frontend development server:**

   ```bash
   npm start
   ```

   This will start the frontend at `http://localhost:3000` (by default).

---

If you are using the deployed backend, you don't need to set up the backend.

### **Backend Setup**

To set up the backend:

1. **Navigate to the `backend` directory:**

   ```bash
   cd backend
   ```

2. **Add the `.env` file in the `backend` folder:**

   Create a `.env` file with the following configuration:

   ```env
  DB_USER=rishabhsahu13873
  DB_PASSWORD=Em792tRohEe36tvt
  DB_NAME=main


   ```

3. **Install the backend dependencies:**

   ```bash
   npm install
   ```

4. **Start the backend server:**

   ```bash
   node index.js
   ```

   This will start the backend at `http://localhost:4000`.

---

## **Project Features**

The **User Management Dashboard** includes the following features:

### 1. **Role Management**
   - **Create, Edit, and Delete Roles:** Create new roles, assign permissions, and edit or delete existing roles. Each role has associated permissions that define the user's access rights.
   - **Assign Roles to Users:** Assign one or more roles to each user, controlling what areas of the application they can access.

### 2. **Permission Management**
   - **Add, Edit, and Delete Permissions:** Define various permissions such as "view", "edit", "delete", and more. Permissions are linked to specific actions within the application.
   - **Assign Permissions to Roles:** Associate specific permissions with each role, enabling or restricting certain actions for users in those roles.

### 3. **User Management**
   - **User Profiles:** View a list of all users, their roles, and their assigned permissions. User information is displayed in a clear table format with options to edit or delete.
   - **Add, Edit, and Delete Users:** Create new users, edit their details, and delete users as needed.
   - **Role-Based User Filtering:**  
     Users can filter the displayed users based on their assigned roles, allowing admins to quickly locate users with specific roles.
   

### 4. **Backend API Endpoints**
   - **Role and Permission APIs:** These include routes for adding, editing, deleting, and fetching roles and permissions. This allows the frontend to interact with the backend to manage roles and permissions dynamically.
   - **User APIs:** APIs for adding, editing, and deleting users, as well as fetching user data with their assigned roles.

### 5. **Responsive UI**
   - **Mobile-Friendly Interface:** The dashboard is built to be fully responsive, ensuring it works well on devices of all screen sizes.
   - **Interactive Modals:** Add, edit, and delete roles and permissions through modals, improving the user experience.

### 6. **Error Handling and Notifications**
   - **Real-Time Notifications:** Success and error notifications are shown to users when actions like creating or deleting a role are performed, using **React-Toastify** for smooth user feedback.
   - **Error Handling:** Proper error handling is implemented both on the frontend and backend to ensure a seamless experience for users.

---