import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => (
<nav id="footer" className="bg-gray-700">

{/* <!-- start container --> */}
<div className="container mx-auto px-12 py-5 sm:py-6">

    <div className="flex flex-wrap overflow-hidden sm:-mx-1 md:-mx-px lg:-mx-2 xl:-mx-2">

        <div className="w-full overflow-hidden flex justify-center sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
            {/* <!-- Column 1 Content --> */}
            
            <NavLink to="/" className="flex items-center flex-shrink-0 text-white mr-6">
    <svg className="fill-current h-10 w-9" width="47" height="47" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg"><path d="M22.507,0H9.175C7.9,0,6.87,1.034,6.87,2.309v27.07c0,1.271,1.03,2.306,2.305,2.306h13.332
		c1.273,0,2.307-1.034,2.307-2.306V2.309C24.813,1.034,23.78,0,22.507,0z M23.085,25.672H8.599V3.895h14.486V25.672z M18.932,2.343
		h-6.181V1.669h6.182L18.932,2.343L18.932,2.343z M21.577,2.035c0,0.326-0.266,0.59-0.591,0.59c-0.326,0-0.591-0.265-0.591-0.59
		s0.265-0.59,0.591-0.59C21.312,1.444,21.577,1.709,21.577,2.035z M18.655,29.225h-5.629v-1.732h5.629V29.225z"/></svg>
    <span className="font-semibold text-xl tracking-tight">Accessories</span>
  </NavLink>
        </div>

        <div className="w-full overflow-hidden flex flex-col justify-center sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
            {/* <!-- Column 2 Content --> */}


            <h4 className="text-white text-center mb-2">Important</h4>
            <ul className="nav navbar-nav text-center">
                <li id="navi-2" className="leading-7 text-sm">
                    <a className="text-gray-500 hover:text-orange-500 text-small" href="/page-1">
                        Page 1 </a>
                </li>
                <li id="navi-1" className="leading-7 text-sm"><a className="text-gray-500 hover:text-orange-500 text-small" href="/page-2">Page 2</a></li>
            </ul>


        </div>

        <div className="w-full overflow-hidden flex flex-col justify-center sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
            {/* <!-- Column 3 Content --> */}
            <h4 className="text-white text-center mb-2">Info</h4>
            <ul className="text-center">
            <li id="navi-2" className="leading-7 text-sm">
                <a className="text-gray-500 hover:text-orange-500 text-small" href="/page-1">
                    Page 1 </a>
            </li>
            <li id="navi-1" className="leading-7 text-sm"><a className="text-gray-500 hover:text-orange-500 text-small" href="/page-2">Page 2</a></li>
            </ul>
        </div>

        <div className="w-full overflow-hidden flex flex-col justify-center sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
            {/* <!-- Column 4 Content --> */}

            <h4 className="text-white text-center mb-2">Products</h4>
            <ul className="text-center">
            <li id="navi-2" className="leading-7 text-sm">
                <a className="text-gray-500 hover:text-orange-500 text-small" href="/page-1">
                    Page 1 </a>
            </li>
            <li id="navi-1" className="leading-7 text-sm"><a className="text-gray-500 hover:text-orange-500 text-small" href="/page-2">Page 2</a></li>
            </ul>
        </div>

    </div>



    {/* <!-- Start footer bottom --> */}

    <div className="pt-4 flex justify-center md:flex items-center" style={{borderTop:"1px solid white"}}>
        <ul className="">
            <li className="sm:mx-2 sm:inline leading-7 text-sm" id="footer-navi-2"><a className="text-white  text-small hover:text-orange-500" href="/disclaimer">Disclaimer</a></li>
            <li className="sm:mx-2 sm:inline leading-7 text-sm" id="footer-navi-2"><a className="text-white  text-small hover:text-orange-500" href="/cookie">Cookie policy</a></li>
            <li className="sm:mx-2 sm:inline leading-7 text-sm" id="footer-navi-2"><a className="text-white  text-small hover:text-orange-500" href="/privacy">Privacy</a></li>
            </ul>
    </div>


    {/* <!-- end container --> */}
    </div>



</nav>
)
        


export default Footer


