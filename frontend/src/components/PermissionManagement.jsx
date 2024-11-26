import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import LottiePlayer from "./LottiePlayer.jsx"

const PermissionManagement = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [permissions, setPermissions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const defaultData = {
    name: "",
    description: "",
  };
  const [newPermission, setNewPermission] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const addPermission = async () => {
    try {
      setSubmitting(true);
      const response = await fetch(`${backendUrl}/api/permissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPermission),
      });
      if (response.ok) {
        toast.success("Permission Added");
        fetchPermissions();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setModalOpen(false);
      setNewPermission(defaultData);
      setSubmitting(false);
    }
  };

  const deletePermission = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/api/permissions/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Permission Deleted");
        fetchPermissions();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setNewPermission(defaultData);
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between p-4 my-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
          Permission Management
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2 font-bold text-sm sm:text-base"
        >
          <PlusIcon className="h-5 w-5" />
          Add Permission
        </button>
      </div>

      {/* Table Section */}

      {loading ? (
        <LottiePlayer />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full  bg-white shadow-md rounded-lg text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 sm:p-4 text-left">Name</th>
                <th className="p-2 sm:p-4 text-left">Description</th>
                <th className="p-2 sm:p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions?.map((permission) => (
                <tr
                  key={permission._id}
                  className="border-b hover:bg-gray-50 text-xs sm:text-sm"
                >
                  <td className="px-4 py-2 sm:px-4 sm:py-2">
                    {permission.name}
                  </td>
                  <td className="px-4 py-2 sm:px-4 sm:py-2">
                    {permission.description}
                  </td>
                  <td className="px-4 py-2  sm:px-4 sm:py-2 space-x-2">
                    <button
                      onClick={() => deletePermission(permission._id)}
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

      {/* Modal for Adding Permission */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => closeModal()}
        title="Add New Permission"
      >
        <div className="flex-grow space-y-4">
          <label className="block">
            <span className="text-gray-700 text-sm sm:text-base">Name:</span>
            <input
              type="text"
              value={newPermission.name}
              onChange={(e) =>
                setNewPermission({ ...newPermission, name: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 text-sm sm:text-base">
              Description:
            </span>
            <input
              type="text"
              value={newPermission.description}
              onChange={(e) =>
                setNewPermission({
                  ...newPermission,
                  description: e.target.value,
                })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />
          </label>
        </div>
        <div className="mt-4">
          <button
            onClick={addPermission}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 text-sm sm:text-base"
          >
            {submitting ? "Submitting..." : "Add Permission"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
