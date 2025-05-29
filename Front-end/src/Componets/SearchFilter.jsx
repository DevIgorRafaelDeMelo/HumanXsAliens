import React from "react";

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="text-center mb-6">
      <input
        type="text"
        placeholder="Buscar vídeos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 bg-gray-700 text-white rounded-md w-64"
      />
    </div>
  );
};

export default SearchFilter;
