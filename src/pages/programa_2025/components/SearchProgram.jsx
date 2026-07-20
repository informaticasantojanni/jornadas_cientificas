import React, { useState } from "react";
import { usePrograma } from "../hooks/usePrograma";
import CancelIcon from "../svgIcons/CancelIcon";

const SearchProgram = () => {
  const { searchTerm, setSearchTerm } = usePrograma();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full max-w-[350px] rounded-xl bg-CardGrayLight p-2 flex items-center mb-5">
      <p className="px-2">Buscar</p>
      <input
        className="w-[100px] h-[30px] rounded-sm"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar..."
        style={{ padding: "8px", marginRight: "8px", flex: 1 }}
      />
      {searchTerm && (
        <button onClick={handleDelete}>
          <CancelIcon width={"30px"} />
        </button>
      )}
    </div>
  );
};

export default SearchProgram;
