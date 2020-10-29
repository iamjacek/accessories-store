import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => (
    <nav className="flex items-center flex-wrap justify-between bg-gray-700 p-6">
  <NavLink to="/" className="flex items-center flex-shrink-0 text-white mr-6">
    <svg className="fill-current h-10 w-9" width="47" height="47" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"><path d="M22.507,0H9.175C7.9,0,6.87,1.034,6.87,2.309v27.07c0,1.271,1.03,2.306,2.305,2.306h13.332
		c1.273,0,2.307-1.034,2.307-2.306V2.309C24.813,1.034,23.78,0,22.507,0z M23.085,25.672H8.599V3.895h14.486V25.672z M18.932,2.343
		h-6.181V1.669h6.182L18.932,2.343L18.932,2.343z M21.577,2.035c0,0.326-0.266,0.59-0.591,0.59c-0.326,0-0.591-0.265-0.591-0.59
		s0.265-0.59,0.591-0.59C21.312,1.444,21.577,1.709,21.577,2.035z M18.655,29.225h-5.629v-1.732h5.629V29.225z"/></svg>
    <span className="font-semibold text-xl tracking-tight">Accessories</span>
  </NavLink>
  <div className="block sm:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-orange-100 border-orange-100 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div className="w-full hidden sm:block flex-grow sm:flex sm:items-center sm:w-auto pl-12 sm:pl-1">
    <div className="sm:flex-grow">
      <NavLink to='/' exact activeClassName="text-orange-500" className="block text-md mt-4 sm:inline-block sm:mt-0 text-orange-100 hover:text-orange-500 mr-4">
        Browse Categories
      </NavLink>
      
    </div>
    <div>
        <NavLink to='/signin' activeClassName="text-orange-500" className="block text-md mt-4 sm:inline-block sm:mt-0 text-orange-100 hover:text-orange-500 mr-4 active:text-xl">
          Sign in
        </NavLink>
        <NavLink to='/signup' activeClassName="text-orange-500 border-orange-500" className="inline-block mt-5 text-md px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-700 hover:bg-orange-500 mt-4 sm:mt-0">Sign up</NavLink>
    </div>
  </div>
</nav>
)

export default Navbar
