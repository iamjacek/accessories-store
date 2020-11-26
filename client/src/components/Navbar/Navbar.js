import React, { useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import MobileMenu from '../MobileMenu/MobileMenu'
import x from '../../assets/cancel.svg'
import { getToken, clearBasket, clearToken } from '../../utils'
import basketIcon from '../../assets/shopping-cart.svg'
import line from '../../assets/logo-line.svg'

const Navbar = (props) => {



  const handleSignout = () => {
    clearToken()
    clearBasket()
    props.history.push('/')
    //clear basket
    window.location.reload();
  }
  
    return (getToken() !== null ? 
    <AuthNav handleSignout={handleSignout}  /> : <UnAuthNav />)
  
}



const AuthNav = ({ handleSignout }) => {
  

  const [isMenuOpen, setMenuState] = useState(false)

  const toggleMobileMenu = () => {
    setMenuState(!isMenuOpen)
  }



  return (
    <nav className="bg-white pb-2 px-12">
      <div className="container mx-auto flex items-center flex-wrap justify-between">
      <NavLink to="/" className="flex flex-col items-center flex-shrink-0 text-white mr-6 -mt-8">
        <img src={line} alt="logo line" className="transform translate-y-10 pb-1 translate-x-3"/>
        <div className="flex flex-row">
          <span className="font-racing text-5xl tracking-wide text-gray-700 text-shadow-md">beep</span>
          <span className="font-racing text-5xl tracking-wide text-purple-600 text-shadow-md">line</span>
        </div>
        
        <p className="text-sm text-gray-600 text-shadow-md transform -translate-y-2">Selected phone accessories</p>
      </NavLink>
      <div className="block sm:hidden">
        <button onClick={toggleMobileMenu} className="flex items-center px-3 py-2 border rounded text-orange-100 border-orange-100 hover:text-white hover:border-white">
          { isMenuOpen &&
          <div className="w-3 h-3">
              <img src={x} className="fill-current" alt="close icon"/>
          </div>

            
          }
          { !isMenuOpen &&
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          }
        </button>
      </div>
      <div className="w-full hidden sm:block flex-grow sm:flex sm:items-center sm:w-auto sm:pl-1">
        <div className="sm:flex-grow">
          <NavLink to='/' exact activeClassName="italic" className="block text-md font-medium sm:inline-block text-gray-700 hover:text-purple-600 mr-4">
            Categories
          </NavLink>
          
        </div>
        <div className="flex flex-row justify-center items-center">
          <button className="px-6 py-1 mx-2" >
            <img src={basketIcon} alt="basket-trolley" className="h-6"></img>
          </button>
            <NavLink to='/checkout' activeClassName="text-orange-500" className="block text-md mt-4 sm:inline-block sm:mt-0 text-orange-100 hover:text-orange-500 mr-4 active:text-xl">
              Checkout
            </NavLink>
            <button onClick={handleSignout}  className="button__hover inline-block mt-5 text-md px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-700 hover:bg-orange-500 mt-4 sm:mt-0">Sign out</button>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} toggleX={toggleMobileMenu}/>
      </div>
      
    </nav>
  )
}

const UnAuthNav = () => {

  const [isMenuOpen, setMenuState] = useState(false)

  const toggleMobileMenu = () => {
    setMenuState(!isMenuOpen)
  }

  return (
    <nav className="bg-white py-4 px-12">
      <div className="container mx-auto flex items-center flex-wrap justify-between">
      <NavLink to="/" className="flex items-center flex-shrink-0 text-white mr-6 pt-1">
      <span className="font-racing text-4xl tracking-wide text-gray-700">beep</span>
        <span className="font-racing text-4xl tracking-wide text-purple-600">line</span>
      </NavLink>
      <div className="block sm:hidden">
        <button onClick={toggleMobileMenu} className="flex items-center px-3 py-2 border rounded text-orange-100 border-orange-100 hover:text-white hover:border-white">
          { isMenuOpen &&
          <div className="w-3 h-3">
              <img src={x} className="fill-current" alt="close icon"/>
          </div>
          }
          { !isMenuOpen &&
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          }
        </button>
      </div>
      <div className="w-full hidden sm:block flex-grow sm:flex sm:items-center sm:w-auto sm:pl-1">
        <div className="sm:flex-grow">
        <NavLink to='/' exact activeClassName="italic" className="block text-md font-medium sm:inline-block text-gray-700 hover:text-purple-600 mr-4">
            Categories
          </NavLink>
          
        </div>
        <div>
          <button className="px-6 py-1 mx-2" >
            <img src={basketIcon} alt="basket-trolley" className="h-6"></img>
          </button>
            <NavLink to='/signin' activeClassName="text-orange-500" className="block text-md mt-4 sm:inline-block sm:mt-0 text-orange-100 hover:text-orange-500 mr-4 active:text-xl">
              Sign in
            </NavLink>
            <NavLink to='/signup' activeClassName="text-orange-500 border-orange-500" className="inline-block mt-5 text-md px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-700 hover:bg-orange-500 mt-4 sm:mt-0">Sign up</NavLink>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} toggleX={toggleMobileMenu}/>
      </div>
      
    </nav>
  )
}

export default withRouter(Navbar)
