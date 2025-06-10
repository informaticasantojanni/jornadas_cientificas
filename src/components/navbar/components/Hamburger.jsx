import React from 'react'
import "./Hamburger.css"

const Hamburger = ({ menuOpen, setMenuOpen, hamburgerCheckbox, setHamburgerCheckbox}) => {

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
        setHamburgerCheckbox(!hamburgerCheckbox);
    };

    return (
        <div>
            <label htmlFor="check">
                <input 
                type="checkbox" 
                id="check" 
                onClick={handleMenuToggle} 
                className={hamburgerCheckbox ? "checked" : ""}/>
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
    )
}

export default Hamburger