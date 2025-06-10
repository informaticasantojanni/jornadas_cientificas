import React from "react";

const ButtonLogout = ({
  name: name,
  icon: NavIcon,
  handleClick: handleClick,
}) => {
  return (
    <>
      <button
        className="pb-3 text-center text-sm flex flex-col items-center "
        onClick={() => handleClick()}
      >
        <div className="w-[45px] h-[45px] rounded-full border-[1px]  hover:bg-White-20 transition-colors duration-200 flex justify-center items-center">
          <NavIcon with="30px" height="30px" />
        </div>
        {name}
      </button>
    </>
  );
};

export default ButtonLogout;
