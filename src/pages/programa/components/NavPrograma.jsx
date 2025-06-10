import React, { useState } from "react";
import { usePrograma } from "../hooks/usePrograma";
import LeftArrowIcon from "../svgIcons/LeftArrowIcon";
import RightArrowIcon from "../svgIcons/RightArrowIcon";

const NavPrograma = () => {
  const { calendario, calendarioMuestra, setProgramaDay, currentDayIndex, setCurrentDayIndex } = usePrograma();



  const handleNext = () => {
    if (currentDayIndex < calendario.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
      setProgramaDay(calendario[currentDayIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
      setProgramaDay(calendario[currentDayIndex - 1]);
    }
  };

  return (
    <div className="h-[40px] flex items-center mt-10 mb-5">
      <div className="h-full bg-Violet flex items-center ps-4 rounded-tl-xl rounded-bl-xl">
        <button
          onClick={handlePrevious}
          className={
            currentDayIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }
        >
          <LeftArrowIcon width={"30px"} height={"30px"} />
        </button>
      </div>

      <div className="h-full bg-Violet flex items-center mx-1">
        <h2 className="px-5 w-[150px] text-White text-center font-semiBold">
          {calendarioMuestra[currentDayIndex]}
        </h2>
      </div>

      <div className="h-full bg-Violet flex items-center px-2 rounded-tr-xl rounded-br-xl">
        <button
          onClick={handleNext}
          className={
            currentDayIndex === calendario.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }
        >
          <RightArrowIcon width={"30px"} height={"30px"} />
        </button>
      </div>
    </div>
  );
};

export default NavPrograma;

/**
 *   return (
    <div className='d-flex py-10'>
      {calendario.map((day, index) => {
        return (
          <button 
          key={index}
          className='px-5'
          onClick={() => setProgramaDay(day)}
          >{day}</button>
        )
      })}
    </div>
  )
 */
