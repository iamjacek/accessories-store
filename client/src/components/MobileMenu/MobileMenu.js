import React from 'react'
import { NavLink } from 'react-router-dom'
import basket from '../../assets/shopping-cart.svg'

const MobileMenu = ({isOpen, toggleX, triggerBasket}) => {

    const handleClick = () => {
        toggleX()
        triggerBasket()
    }

    return (
        <div className={`${ isOpen ? 'block' : 'hidden' } sm:hidden pb-6 rounded-2xl w-full mt-2 flex flex-col flex-grow items-center bg-gray-100`}>
            
        <NavLink onClick={toggleX} to='/' exact className="block text-md mt-4 text-gray-700 mr-4">
            Categories
        </NavLink>

        <button onClick={handleClick} exact className="block text-md mt-4 text-gray-700 mr-4">
            <div className="flex flex-row"><img src={basket} alt="basket" className="h-5 w-5 mr-2"/> Basket</div>
        </button>

        <NavLink onClick={toggleX} to='/signin'  className="block text-md mt-4 text-gray-700 mr-4">
            Sign in
        </NavLink>

        <NavLink to='/signup' onClick={toggleX} className="bg-purple-600 button-beep inline-block mt-5 text-md px-8 py-2 leading-none font-semibold rounded-full text-white mt-4 sm:mt-0 shadow">Sign up</NavLink>
       

        </div>
    )
}

export default MobileMenu
