import React, { useState, useEffect } from "react";
import NavItems from "./NavItems";
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";
import { signOut } from "../../../services/firebase.services";
import { useAuth } from "../../../core/auth/hooks/useAuth";

const NavMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hamburgerCheckbox, setHamburgerCheckbox] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    menuOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [menuOpen]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    setHamburgerCheckbox(!hamburgerCheckbox);
  };

  const hangleLogout = () => {
    signOut();
    handleMenuToggle();
  };

  return (
    <div className="w-screen fixed top-0 left-0 z-20 bg-White">
      <div className="p-2">
        <Hamburger
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          hamburgerCheckbox={hamburgerCheckbox}
          setHamburgerCheckbox={setHamburgerCheckbox}
          onClick={handleMenuToggle}
        />
      </div>

      {menuOpen && (
        <div className="w-screen h-screen flex justify-center items-start  bg-White">
          <ul className="pt-20">
            {NavItems.map((item) => (
              <li key={item.id} className="text-center pb-5">
                <Link to={item.link} onClick={() => handleMenuToggle()}>
                  {item.name}
                </Link>
              </li>
            ))}
            {!isAuthenticated ? (
              <li className="w-full flex justify-center pb-3">
                <Link to={"/login"} onClick={() => handleMenuToggle()}>
                  Acceder
                </Link>
              </li>
            ) : (
              <>
                <li className="w-full flex justify-center pb-10">
                  <Link to={"/perfil"} onClick={() => handleMenuToggle()}>
                    Mi perfil
                  </Link>
                </li>
                <li className="w-full flex justify-center pb-3">
                  <button onClick={hangleLogout}>Salir</button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavMobile;
