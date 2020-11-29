import React from "react"
import { NavLink } from "react-router-dom"
import basket from "../../assets/shopping-cart.svg"

const MobileMenuAuth = ({ isOpen, toggleX, toSignOut }) => {
  const handleClick = () => {
    toggleX()
    toSignOut()
  }

  const handleSignout = () => {}
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } md:hidden pb-6 rounded-2xl w-full mt-2 flex flex-col flex-grow items-center bg-gray-100`}
    >
      <NavLink
        onClick={toggleX}
        to="/"
        exact
        className="block text-md text-center mt-4 text-gray-700"
      >
        Categories
      </NavLink>

      <NavLink
        onClick={toggleX}
        to="/checkout"
        activeClassName="italic"
        className="block text-md mt-4 text-gray-700 text-center"
      >
        Checkout
      </NavLink>

      <button
        onClick={handleClick}
        className="bg-purple-600 button-beep inline-block mt-3 text-md px-8 py-2 leading-none font-semibold rounded-full text-white shadow"
      >
        Sign out
      </button>
    </div>
  )
}

export default MobileMenuAuth
