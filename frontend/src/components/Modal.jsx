import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl shadow-lg relative h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <button
            className="text-2xl font-bold text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-content flex flex-col flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
