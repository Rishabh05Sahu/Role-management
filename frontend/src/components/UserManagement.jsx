import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import LottiePlayer from "./LottiePlayer";

const UserManagement = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [filterRole, setFilterRole] = useState(""); 
  const [filterStatus, setFilterStatus] = useState(""); 
  

  const filteredUsers = users.filter((user) => {
    const roleMatches =
      !filterRole || user.roles.some((role) => role.name === filterRole); // Match role
    const statusMatches = !filterStatus || user.status === filterStatus; // Match status
    return roleMatches && statusMatches; // Both filters must match
  });
  

  const defaultData = {
    name: "",
    email: "",
    roles: [],
    status: "Active",
  };
  const [newUser, setNewUser] = useState(defaultData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/users/all`);
      const data = await response.json();
      if (response.ok) {
        setUsers(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/roles/all`);
      const data = await response.json();
      if (response.ok) {
        setRoles(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(`${backendUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": newUser ? JSON.stringify(newUser).length : 0,
        },
        body: JSON.stringify(newUser),
        
      });
     

      if (response.ok) {
        toast.success("User Added");
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setModalOpen(false);
      setNewUser(defaultData);
      setSubmitting(false);
    }
  };

  const editUser = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(
        `${backendUrl}/api/users/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      if (response.ok) {
        toast.success("User Updated");
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setModalOpen(false);
      setNewUser(defaultData);
      setIsEditing(false);
      setSubmitting(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${backendUrl}/api/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("User Deleted");
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const openEditModal = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      roles: user.roles.map((role) => role._id),
      status: user.status,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentUser(null);
    setModalOpen(false);
    setNewUser(defaultData);
  };

  const toggleRole = (roleId) => {
    setNewUser((prevUser) => {
      const isSelected = prevUser.roles.includes(roleId);
      const updatedRoles = isSelected
        ? prevUser.roles.filter((id) => id !== roleId)
        : [...prevUser.roles, roleId];

      return { ...prevUser, roles: updatedRoles };
    });
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      
      <div className="flex justify-between p-4 my-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
          User Management
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 font-bold text-sm sm:text-base"
        >
          <PlusIcon className="h-5 w-5" />
          Add User
        </button>
      </div>
    

      <div className="flex gap-4 mb-4">
  {/* Role Filter */}
  <select
    value={filterRole}
    onChange={(e) => setFilterRole(e.target.value)}
    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Filter by Role</option>
    <option value="Admin">Admin</option>
    <option value="Manager">Manager</option>
    <option value="User">User</option>
  </select>

  {/* Status Filter */}
  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">Filter by Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>
  
</div>



      {/* Table Section */}

      {loading ? (
        <LottiePlayer/>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 sm:p-4 text-left">Name</th>
                <th className="p-2 sm:p-4 text-left">Email</th>
                <th className="p-2 sm:p-4 text-left">Roles</th>
                <th className="p-2 sm:p-4 text-left">Status</th>
                <th className="p-2 sm:p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 text-xs sm:text-sm"
                >
                  <td className="px-2 py-1 sm:px-4 sm:py-2">{user.name}</td>
                  <td className="px-2 py-1 sm:px-4 sm:py-2">{user.email}</td>
                  <td className="px-2 py-1 sm:px-4 sm:py-2">
                    {user.roles.map((role) => role.name).join(", ")} 
                  </td>
                  <td className="px-2 py-1 sm:px-4 sm:py-2">{user.status}</td>
                  <td className="px-2 py-1 sm:px-4 sm:py-2 space-x-2 flex">
                    <button
                      onClick={() => openEditModal(user)}
                      className="border-2 border-yellow-400 text-yellow-500 font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-yellow-400 hover:text-white flex items-center gap-2"
                    >
                      <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className=" hidden md:block">Edit</span>
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="border-2 border-red-500 text-red-500 font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-red-500 hover:text-white flex items-center gap-2"
                    >
                      <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className=" hidden md:block">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}



      {/* Modal for Adding or Editing User */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => closeModal()}
        title={isEditing ? "Edit User" : "Add New User"}
      >
        <div className="flex-grow space-y-4">
          <label className="block">
            <span className="text-gray-700 text-sm sm:text-base">Name:</span>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 text-sm sm:text-base">Email:</span>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 text-sm sm:text-base">Status:</span>
            <select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>

          {/* Roles Tags Section */}
          <div className="flex flex-wrap gap-2 mb-4">
            {newUser.roles.map((roleId) => {
              const role = roles.find((r) => r._id === roleId);
              return (
                role && (
                  <div
                    key={role._id}
                    className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1"
                  >
                    {role.name}
                    <button
                      onClick={() => toggleRole(role._id)}
                      className="ml-2 text-sm text-white"
                    >
                      &times;
                    </button>
                  </div>
                )
              );
            })}
          </div>

          {/* Roles Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full bg-gray-100 text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            >
              Select Roles
            </button>
            {dropdownOpen && (
              <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-56 overflow-y-auto">
                {roles.map((role) => (
                  <div
                    key={role._id}
                    onClick={() => toggleRole(role._id)}
                    className="cursor-pointer p-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {role.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 text-sm sm:text-base"
            onClick={isEditing ? editUser : addUser}
          >
            {submitting
              ? "Submitting..."
              : isEditing
              ? "Update User"
              : "Add User"}
          </button>
        </div>
      </Modal>
     
    </div>
  );
};

export default UserManagement;
