import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import LottiePlayer from "./LottiePlayer";


const RoleManagement = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const defaultData = {
    name: "",
    permissions: [],
  };
  const [newRole, setNewRole] = useState(defaultData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/roles/all`);
      if (!response.ok) throw new Error("Failed to fetch roles");
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

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/permissions/all`);
      const data = await response.json();
      if (response.ok) {
        setPermissions(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addRole = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(`${backendUrl}/api/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRole),
      });
      if (response.ok) {
        toast.success("Role Added");
        fetchRoles();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setModalOpen(false);
      setNewRole(defaultData);
      setSubmitting(false);
    }
  };

  const editRole = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(
        `${backendUrl}/api/roles/${currentRole._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRole),
        }
      );
      if (response.ok) {
        toast.success("Role Updated");
        fetchRoles();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setModalOpen(false);
      setNewRole(defaultData);
      setIsEditing(false);
      setSubmitting(false);
    }
  };

  const deleteRole = async (roleId) => {
    try {
      const response = await fetch(`${backendUrl}/api/roles/${roleId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Role Deleted");
        fetchRoles();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const openEditModal = (role) => {
    setIsEditing(true);
    setCurrentRole(role);
    setNewRole({
      name: role.name,
      permissions: role.permissions.map((permission) => permission._id),
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentRole(null);
    setModalOpen(false);
    setNewRole(defaultData);
  };

  const togglePermission = (permissionId) => {
    setNewRole((prevRole) => {
      const isSelected = prevRole.permissions.includes(permissionId);
      const updatedPermissions = isSelected
        ? prevRole.permissions.filter((id) => id !== permissionId)
        : [...prevRole.permissions, permissionId];

      return { ...prevRole, permissions: updatedPermissions };
    });
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between p-4 my-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
          Role Management
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 font-bold text-sm sm:text-base"
        >
          <PlusIcon className="h-5 w-5" />
          Add Role
        </button>
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
                <th className="p-2 sm:p-4 text-left">Permissions</th>
                <th className="p-2 sm:p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles?.map((role) => (
                <tr
                  key={role._id}
                  className="border-b hover:bg-gray-50 text-xs sm:text-sm"
                >
                  <td className="px-2 py-1 sm:px-4 sm:py-2">{role.name}</td>
                  <td className="px-2 py-1 sm:px-4 sm:py-2">
                    {role.permissions
                      .map((permission) => permission.name)
                      .join(", ")}
                  </td>
                  <td className="px-2 py-1 sm:px-4 sm:py-2 space-x-2 flex">
                    <button
                      onClick={() => openEditModal(role)}
                      className="border-2 border-yellow-400 text-yellow-500 font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-yellow-400 hover:text-white flex items-center gap-2"
                    >
                      <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className=" hidden md:block">Edit</span>
                    </button>
                    <button
                      onClick={() => deleteRole(role._id)}
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

      {/* Modal for Adding or Editing Role */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => closeModal()}
        title={isEditing ? "Edit Role" : "Add New Role"}
      >
        <div className="flex-grow space-y-4">
          <label className="block">
            <span className="text-gray-700 text-sm sm:text-base">Name:</span>
            <input
              type="text"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />
          </label>

          {/* Permissions Tags Section */}
          <div className="flex flex-wrap gap-2 mb-4">
            {newRole.permissions.map((permissionId) => {
              const permission = permissions.find(
                (perm) => perm._id === permissionId
              );
              return (
                permission && (
                  <div
                    key={permission._id}
                    className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1"
                  >
                    {permission.name}
                    <button
                      onClick={() => togglePermission(permission._id)}
                      className="ml-2 text-sm text-white"
                    >
                      &times;
                    </button>
                  </div>
                )
              );
            })}
          </div>

          {/* Permissions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full bg-gray-100 text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            >
              Select Permissions
            </button>
            {dropdownOpen && (
              <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-56 overflow-y-auto">
                <div className="overflow-y-auto">
                  {permissions.map((permission) => (
                    <div
                      key={permission._id}
                      onClick={() => togglePermission(permission._id)}
                      className="cursor-pointer p-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {permission.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={isEditing ? editRole : addRole}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 text-sm sm:text-base"
          >
            {submitting
              ? "Submitting..."
              : isEditing
              ? "Update Role"
              : "Add Role"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RoleManagement;
