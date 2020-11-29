import React, { useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import MobileMenu from '../MobileMenu/MobileMenu'
import x from '../../assets/cancel.svg'
import { getToken, clearBasket, clearToken } from '../../utils'
import basketIcon from '../../assets/shopping-cart.svg'
import line from '../../assets/logo-line.svg'

const Navbar = ({ basketOpenInfo, ...props }) => {

  const toggleBasket = () => {
    basketOpenInfo()
  }
 const handleSignout = () => {
    clearToken()
    clearBasket()
    props.history.push('/')
    //clear basket
    window.location.reload();
  }
  
    return (getToken() !== null ? 
    <AuthNav handleSignout={handleSignout} basketOpen={toggleBasket} /> : <UnAuthNav basketOpen={toggleBasket}/>)
  
}



const AuthNav = ({ handleSignout, basketOpen }) => {
  
  const toggleBasket = () => {
    basketOpen()
  }

  const [isMenuOpen, setMenuState] = useState(false)

  const toggleMobileMenu = () => {
    setMenuState(!isMenuOpen)
  }



  return (
    <nav className="bg-white pb-2 px-5 sm:px-12">
      <div className="w-full flex items-center justify-between flex-col">
        <div className="container w-full flex items-center justify-between flex-row">
          <NavLink to="/" className="flex flex-col items-center flex-shrink-0 text-white mr-6 -mt-10 -mb-1">
            <img src={line} alt="logo line" className="transform translate-y-10 pb-1 translate-x-3"/>
            <div className="flex flex-row">
              <span className="font-racing text-5xl tracking-wide text-gray-700 text-shadow-md">beep</span>
              <span className="font-racing text-5xl tracking-wide text-purple-600 text-shadow">line</span>
            </div>
            
            <p className="text-sm text-gray-600 text-shadow-md transform -translate-y-3 tracking-wide">Selected phone accessories</p>
          </NavLink>
          
          <div className="w-full flex flex-row items-center">
            <div className="flex hidden md:block flex-grow items-center">
              <NavLink to='/' exact activeClassName="italic" className="hover:underline text-md font-medium text-gray-700 hover:text-purple-600 mr-4">
                Categories
              </NavLink>
              
            </div>
            <div className="flex flex-row items-center">

                <button className="px-3 hidden md:block py-1 mx-2" onClick={toggleBasket}>
                  <img src={basketIcon} alt="basket-trolley" className="h-6" />
                </button>

                <NavLink to='/checkout' activeClassName="italic" className="hidden md:block hover:underline text-md text-gray-700 hover:text-purple-600 mr-4 active:text-xl">
                  Checkout
                </NavLink>

                <button onClick={handleSignout}  className="bg-purple-600 hidden md:block inline-block mt-5 text-md font-semibold px-8 py-2 leading-none rounded-full text-white mt-4 sm:mt-0 shadow button-beep">
                  Sign out
                </button>
                
            </div>

            <div className="block md:hidden focus:outline-none ml-auto">
            <button onClick={toggleMobileMenu} className="flex focus:outline-none items-center px-3 py-2 rounded">
              { isMenuOpen &&
              <div className="w-5 h-5">
                  <img src={x} className="fill-current" alt="close icon"/>
              </div>
              }
              { !isMenuOpen &&
              <div className="w-5 h-5">
                <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path fill="#4a5568" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </div>
              }
            </button>
          </div>
          </div>
          
        </div>
        <MobileMenu isOpen={isMenuOpen} toggleX={toggleMobileMenu} triggerBasket={toggleBasket} />
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

  return ( 
    <nav className="bg-white pb-2 px-5 sm:px-12">
       <div className="container w-full flex items-center content-center flex-col">
      <div className="w-full flex items-center sm:items-end justify-between flex-row">
      <NavLink to="/" className="flex flex-col items-center flex-shrink-0 text-white mr-6 -mt-10 -mb-1">
        <img src={line} alt="logo line" className="transform translate-y-10 pb-1 translate-x-3"/>
        <div className="flex flex-row">
          <span className="font-racing text-5xl tracking-wide text-gray-700 text-shadow-md">beep</span>
          <span className="font-racing text-5xl tracking-wide text-purple-600 text-shadow">line</span>
        </div>
        
        <p className="text-sm text-gray-600 text-shadow-md transform -translate-y-3 tracking-wide">Selected phone accessories</p>
      </NavLink>
      <div className="block sm:hidden focus:outline-none">
        <button onClick={toggleMobileMenu} className="flex focus:outline-none items-center px-3 py-2 rounded">
          { isMenuOpen &&
          <div className="w-5 h-5">
              <img src={x} className="fill-current" alt="close icon"/>
          </div>
          }
          { !isMenuOpen &&
          <div className="w-5 h-5">
            <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </div>
          }
        </button>
      </div>
      <div className="w-full hidden sm:block flex-grow sm:flex sm:items-center sm:w-auto sm:pl-1 pb-6">
        <div className="sm:flex-grow">
        <NavLink to='/' exact activeClassName="italic" className="block hover:underline text-md font-medium sm:inline-block text-gray-700 hover:text-purple-600 mr-4">
            Categories
          </NavLink>
          
        </div>
        
        <div className="flex flex-row justify-center items-center">
          <button className="px-3 py-1 mx-2" onClick={toggleBasket}>
            <img src={basketIcon} alt="basket-trolley" className="h-6"></img>
          </button>
            <NavLink to='/signin' activeClassName="text-orange-500" className="block hover:underline text-md mt-4 sm:inline-block sm:mt-0 text-gray-700 hover:text-purple-600 mr-4 active:text-xl">
              Sign in
            </NavLink>
            <NavLink to='/signup' className="bg-purple-600 button-beep inline-block mt-5 text-md px-8 py-2 leading-none font-semibold rounded-full text-white mt-4 sm:mt-0 shadow">Sign up</NavLink>
            </div>
        
      </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} toggleX={toggleMobileMenu} triggerBasket={toggleBasket}/>
      </div>
      
    </nav>
  )
}

export default withRouter(Navbar)
