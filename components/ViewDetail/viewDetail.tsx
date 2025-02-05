import React from "react";

const ViewDetail = ({ data, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-4 w-full max-w-md text-white">

        <h1 className="text-3xl font-extrabold text-center tracking-wide drop-shadow-md mb-4">
         {data.doctorName}
        </h1>

        <div className="p-6 bg-white bg-opacity-20 rounded-xl shadow-md text-lg">
          <div className="grid grid-cols-2 gap-6 text-white">
            <p className="font-medium">
              <span className="font-semibold">📅</span> {data.sessionDate}
            </p>
            <p className="font-medium">
              <span className="font-semibold">⏰</span> {data.sessionTime}
            </p>
            <p className="font-medium">
              <span className="font-semibold">🖥</span> {data.sessionMode}
            </p>
            <p className="font-medium">
              <span className="font-semibold">💰</span> {data.sessionFee}
            </p>
          </div>
        </div>

        {data.notes && (
          <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg shadow-md">
            <p className="text-white text-base font-light tracking-wide">
              {data.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetail;
