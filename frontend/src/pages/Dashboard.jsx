import React from "react";


const Dashboard = () => (
  <div className="min-h-screen bg-gray-100 flex p-4 md:p-8">

    <div className="bg-white rounded-lg shadow-lg w-full md:h-5/6 flex flex-col items-center justify-center p-6 md:p-12">
      <h2 className="text-2xl md:text-4xl font-semibold text-green-900 mb-6 md:mb-12 text-center">
        Welcome to the Role-Based Access Control Dashboard!
      </h2>
      <p className="text-lg md:text-2xl font-medium text-green-800 mb-6 text-center">
      Effortlessly manage users, roles, and permissions with ease.
      </p>
      <ul className="text-green-900 list-disc text-sm md:text-lg pl-6 md:pl-8 space-y-2 md:space-y-4">
        <li> Manage Users & Roles: Add, edit, or delete users and roles.</li>
        <li>Custom Permissions: Assign specific permissions to each role.</li>
        <li>Flexible Role Assignment: Assign multiple roles to users for precise access.</li>
        <li>User Status Monitoring: Track and update user activity status.</li>
       
      </ul>
    </div>
 
    
  </div>
);

export default Dashboard;

