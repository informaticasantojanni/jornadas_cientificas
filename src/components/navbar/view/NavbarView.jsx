import React from 'react'
import { useGlobal } from '../../../hooks/useGlobal'
import NavDesktop from '../components/NavDesktop';
import NavMobile from '../components/NavMobile';

const NavbarView = () => {

  const { desktopView } = useGlobal();

  return (
    <nav>
      {(desktopView) ? <NavDesktop /> : <NavMobile />}
    </nav>


  )
}

export default NavbarView
