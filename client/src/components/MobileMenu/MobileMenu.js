import React from "react"
import { NavLink } from "react-router-dom"

const MobileMenu = ({ isOpen, toggleX }) => {
  return (
    <div
      className={`${
        isOpen
          ? "transform translate-x-0 ease-out"
          : "transform -translate-x-full ease-in"
      } absolute transition-transform duration-300 top-24 z-40 md:hidden pb-6 rounded-2xl w-full mt-2 flex flex-col flex-grow items-center bg-gray-100`}
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
        to="/signin"
        className="block text-md mt-4 text-gray-700 text-center"
      >
        Sign in
      </NavLink>

      <NavLink
        to="/signup"
        onClick={toggleX}
        className="bg-purple-600 button-beep inline-block mt-3 text-md px-8 py-2 leading-none font-semibold rounded-full text-white shadow"
      >
        Sign up
      </NavLink>
    </div>
  )
}

export default MobileMenu
