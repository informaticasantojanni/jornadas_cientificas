import React, { useState } from "react";
import { useGlobal } from "../../hooks/useGlobal";
import { CircularProgress } from "@mui/material";

const Spinner = () => {
  const { showSpinner } = useGlobal();
  if (!showSpinner) return null;

  return (
    <div className="fixed inset-0 bg-Black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-White rounded-lg ">
        <div className="w-[300px] h-[300px] flex justify-center items-center">
          <CircularProgress />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
