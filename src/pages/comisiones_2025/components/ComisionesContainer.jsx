import React from "react";
import { comites } from "./comites";
import ComisionCard from "./ComisionCard";
import Autoridades from "./Autoridades";

const ComisionesContainer = () => {
  return (
    <div className="w-full m-auto laptop1:w-3/4 laptop2:w-1/2 flex flex-col items-center">
      <div className="w-full laptop1:w-3/4">
        <Autoridades />
      </div>

      {comites.map((comite, index) => (
        <div key={index} className="w-full laptop1:w-3/4">
          <ComisionCard comite={comite} />
        </div>
      ))}
    </div>
  );
};

export default ComisionesContainer;
