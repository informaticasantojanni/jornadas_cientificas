import React from "react";
import NavItems from "./NavItems";
import NavLink from "./NavLink";
import { signOut } from "../../../services/firebase.services";
import { useAuth } from "../../../core/auth/hooks/useAuth";
import LoginIcon from "./svgIcons/LoginIcon";
import PerfilIcon from "./svgIcons/PerfilIcon";
import LogoutIcon from "./svgIcons/LogoutIcon";
import ButtonLogout from "./ButtonLogout";

const NavDesktop = () => {
  const { isAuthenticated } = useAuth();

  return (
    // <div className='h-screen flex flex-col items-start py-3 px-3 text-White bg-Violet'>
    <div className="h-screen flex flex-col items-start py-3 px-3 text-White bg-gradient-to-b from-PauGreenDark to-PauGreenLight rounded-tl-xl rounded-tr-xl">
      <ul className="flex flex-col items-center w-full pt-5">
        {NavItems.map((item) => (
          <li key={item.id} className="pb-3">
            <NavLink {...item} />
          </li>
        ))}
        {!isAuthenticated ? (
          <li className="w-full flex justify-center pb-3">
            <NavLink link={"/login"} name={"Ingresar"} icon={LoginIcon} />
          </li>
        ) : (
          <>
            <li className="w-full flex justify-center pb-3">
              <NavLink link={"/perfil"} name={"Mi perfil"} icon={PerfilIcon} />
            </li>
            <li className="w-full flex justify-center pb-3">
              <ButtonLogout
                name={"Salir"}
                icon={LogoutIcon}
                handleClick={signOut}
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavDesktop;
