import React, { useState } from "react"
import { NavLink, withRouter } from "react-router-dom"
import MobileMenu from "../MobileMenu/MobileMenu"
import MobileMenuAuth from "../MobileMenu/MobileMenuAuth"
import x from "../../assets/cancel.svg"
import { getToken, clearBasket, clearToken, getBasket } from "../../utils"
import basketIcon from "../../assets/shopping-cart.svg"
import line from "../../assets/logo-line.svg"

const Navbar = ({ basketOpenInfo, ...props }) => {
  const toggleBasket = () => {
    basketOpenInfo()
  }

  const handleSignout = () => {
    clearToken()
    clearBasket()
    props.history.push("/")
    //clear basket
    window.location.reload()
  }

  return getToken() !== null ? (
    <AuthNav handleSignout={handleSignout} basketOpen={toggleBasket} />
  ) : (
    <UnAuthNav basketOpen={toggleBasket} />
  )
}

const AuthNav = ({ handleSignout, basketOpen }) => {
  const toggleBasket = () => {
    basketOpen()
  }

  const [isMenuOpen, setMenuState] = useState(false)

  const toggleMobileMenu = () => {
    setMenuState(!isMenuOpen)
  }

  const inTheBasket = () => {
    let sum = 0
    getBasket().map((item) => (sum += item.quantity))
    return sum
  }

  return (
    <nav className="w-full bg-white pb-2 px-5 sm:px-6 md:px-12">
      <div className="w-full flex items-center justify-between flex-col">
        <div className="container w-full flex items-center justify-between flex-row">
          <NavLink
            to="/"
            className="flex flex-col transform scale-75 items-center flex-shrink-0 text-white mr-6 -mt-10 -mb-1"
          >
            <img
              src={line}
              alt="logo line"
              className="transform translate-y-10 pb-1 translate-x-3"
            />
            <div className="flex flex-row">
              <span className="font-racing text-5xl tracking-wide text-gray-700 text-shadow-md">
                beep
              </span>
              <span className="font-racing text-5xl tracking-wide text-purple-600 text-shadow">
                line
              </span>
            </div>

            <p className="text-sm text-gray-600 text-shadow-md transform -translate-y-3 tracking-wide">
              Selected phone accessories
            </p>
          </NavLink>

          <div className="w-full flex flex-row items-center justify-center">
            <div className="flex  flex-grow items-center">
              <NavLink
                to="/"
                exact
                activeClassName="italic"
                className="hover:underline hidden md:block text-md font-medium text-gray-700 hover:text-purple-600 mr-4"
              >
                Categories
              </NavLink>
            </div>
            <div className="flex flex-row items items-center">
              <button
                className="px-3 py-1 mx-2 basket-beep"
                onClick={toggleBasket}
              >
                <img
                  src={basketIcon}
                  alt="basket-trolley"
                  className="h-6 w-6"
                />
                <span className="items-counter">{inTheBasket()}</span>
              </button>

              <NavLink
                to="/checkout"
                activeClassName="italic"
                className="hidden md:block hidden md:block hover:underline text-md text-gray-700 hover:text-purple-600 mr-4 "
              >
                Checkout
              </NavLink>

              <button
                onClick={handleSignout}
                className="bg-purple-600 hidden md:block mt-5 text-md font-semibold px-8 py-2 leading-none rounded-full text-white mt-4 sm:mt-0 shadow button-beep"
              >
                Sign out
              </button>
            </div>

            <div className="block md:hidden focus:outline-none ml-auto">
              <button
                onClick={toggleMobileMenu}
                className="flex focus:outline-none items-center px-3 py-2 rounded"
              >
                {isMenuOpen && (
                  <div className="w-5 h-5">
                    <img src={x} className="fill-current" alt="close icon" />
                  </div>
                )}
                {!isMenuOpen && (
                  <div className="w-5 h-5">
                    <svg
                      className="fill-current h-5 w-5"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Menu</title>
                      <path
                        fill="#4a5568"
                        d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        <MobileMenuAuth
          isOpen={isMenuOpen}
          toggleX={toggleMobileMenu}
          toSignOut={handleSignout}
        />
      </div>
    </nav>
  )
}

const UnAuthNav = ({ basketOpen }) => {
  const [isMenuOpen, setMenuState] = useState(false)

  const toggleMobileMenu = () => {
    setMenuState(!isMenuOpen)
  }

  const toggleBasket = () => {
    basketOpen()
  }

  const inTheBasket = () => {
    let sum = 0
    getBasket().map((item) => (sum += item.quantity))
    return sum
  }

  return (
    <nav className="w-full bg-white pb-2 px-2 sm:px-6 md:px-12">
      <div className="w-full flex items-center justify-between flex-col">
        <div className="container w-full flex items-center justify-between flex-row">
          <NavLink
            to="/"
            className="flex flex-col transform scale-75 items-center flex-shrink-0 text-white mr-0 md:mr-6 -mt-10 -mb-1"
          >
            <img
              src={line}
              alt="logo line"
              className="transform translate-y-10 pb-1 translate-x-3"
            />
            <div className="flex flex-row">
              <span className="font-racing text-5xl tracking-wide text-gray-700 text-shadow-md">
                beep
              </span>
              <span className="font-racing text-5xl tracking-wide text-purple-600 text-shadow">
                line
              </span>
            </div>

            <p className="text-sm text-gray-600 text-shadow-md transform -translate-y-3 tracking-wide">
              Selected phone accessories
            </p>
          </NavLink>

          <div className="w-full flex flex-row items-center justify-center">
            <div className="flex  flex-grow items-center">
              <NavLink
                to="/"
                exact
                activeClassName="italic"
                className="hover:underline hidden md:block text-md font-medium text-gray-700 hover:text-purple-600 mr-4"
              >
                Categories
              </NavLink>
            </div>

            <div className="flex flex-row items-center">
            <button
                className="px-3 py-1 mx-2 basket-beep"
                onClick={toggleBasket}
              >
                <img
                  src={basketIcon}
                  alt="basket-trolley"
                  className="h-6 w-6"
                />
                <span className="items-counter">{inTheBasket()}</span>
              </button>
              <NavLink
                to="/signin"
                activeClassName="italic"
                className="hidden md:block hidden md:block hover:underline text-md text-gray-700 hover:text-purple-600 mr-4 "
              >
                Sign in
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-purple-600 hidden md:block  mt-5 text-md font-semibold px-8 py-2 leading-none rounded-full text-white mt-4 sm:mt-0 shadow button-beep"
              >
                Sign up
              </NavLink>
            </div>
            <div className="block md:hidden focus:outline-none ml-auto">
              <button
                onClick={toggleMobileMenu}
                className="flex focus:outline-none items-center px-3 py-2 rounded"
              >
                {isMenuOpen && (
                  <div className="w-5 h-5">
                    <img src={x} className="fill-current" alt="close icon" />
                  </div>
                )}
                {!isMenuOpen && (
                  <div className="w-5 h-5">
                    <svg
                      className="fill-current h-5 w-5"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Menu</title>
                      <path
                        fill="#4a5568"
                        d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        <MobileMenu isOpen={isMenuOpen} toggleX={toggleMobileMenu} />
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
