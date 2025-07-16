import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50" />
        <p className="text-lg font-semibold pt-40 ">Carregando, aguarde...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
