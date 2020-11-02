import React from 'react'
import { NavLink } from 'react-router-dom'

const MobileMenu = ({isOpen}) => {
    return (
        <div className={`${ isOpen ? 'block' : 'hidden' } sm:hidden pl-12 w-full flex-grow  lg:items-center lg:w-auto`}>
          
        <NavLink to='/' exact activeClassName="text-orange-500" className="block text-md mt-4 sm:inline-block sm:mt-0 text-orange-100 hover:text-orange-500 mr-4">
            Browse Categories
        </NavLink>

        <NavLink to='/signin' activeClassName="text-orange-500" className="block text-md mt-4 sm:inline-block sm:mt-0 text-orange-100 hover:text-orange-500 mr-4 active:text-xl">
          Sign in
        </NavLink>

        <NavLink to='/signup' activeClassName="text-orange-500 border-orange-500" className="inline-block mt-5 text-md px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-700 hover:bg-orange-500 mt-4 sm:mt-0">Sign up</NavLink>
    
        </div>
    )
}

export default MobileMenu
