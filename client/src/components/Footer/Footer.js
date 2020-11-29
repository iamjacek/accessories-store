import React from "react"
import { NavLink } from "react-router-dom"
import line from "../../assets/logo-line.svg"

const Footer = () => (
  <footer id="footer" className="bg-white mt-2">
    {/* <!-- start container --> */}
    <div className="container mx-auto px-12 py-8 sm:py-6">
      <div className="flex flex-wrap overflow-hidden sm:-mx-1 md:-mx-px lg:-mx-2 xl:-mx-2 pb-4">
        <div className="w-full overflow-hidden flex justify-center sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
          {/* <!-- Column 1 Content --> */}

          <NavLink
            to="/"
            className="flex transform scale-75 flex-col items-center flex-shrink-0 text-white mr-6 -mt-10 -mb-1"
          >
            <img
              src={line}
              alt="logo line"
              className="transform translate-y-10 pb-1 translate-x-3 shadow-sm"
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
        </div>

        <div className="w-full overflow-hidden flex flex-col justify-center sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
          {/* <!-- Column 2 Content --> */}

          <h4 className="font-semibold text-center mb-2 text-gray-700">
            Important
          </h4>
          <ul className="nav navbar-nav text-center">
            <li id="navi-2" className="leading-7 text-sm">
              <a
                className="text-gray-600 hover:text-purple-600 hover:underline text-small"
                href="/page-1"
              >
                Page 1{" "}
              </a>
            </li>
            <li id="navi-1" className="leading-7 text-sm">
              <a
                className="text-gray-600 hover:text-purple-600 hover:underline text-small"
                href="/page-2"
              >
                Page 2
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full overflow-hidden flex flex-col justify-center sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
          {/* <!-- Column 3 Content --> */}
          <h4 className="font-semibold text-center mb-2 text-gray-700">Info</h4>
          <ul className="text-center">
            <li id="navi-2" className="leading-7 text-sm">
              <a
                className="text-gray-600 hover:text-purple-600 hover:underline text-small"
                href="/page-1"
              >
                Page 1{" "}
              </a>
            </li>
            <li id="navi-1" className="leading-7 text-sm">
              <a
                className="text-gray-600 hover:text-purple-600 hover:underline text-small"
                href="/page-2"
              >
                Page 2
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full overflow-hidden flex flex-col justify-center sm:my-1 sm:px-1 sm:w-1/2 md:my-px md:px-px md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4 pb-6">
          {/* <!-- Column 4 Content --> */}

          <h4 className="text-center mb-2 text-gray-700 font-semibold">
            Products
          </h4>
          <ul className="text-center">
            <li id="navi-2" className="leading-7 text-sm">
              <a
                className="text-gray-600 hover:text-purple-600 hover:underline text-small"
                href="/page-1"
              >
                Page 1{" "}
              </a>
            </li>
            <li id="navi-1" className="leading-7 text-sm">
              <a
                className="text-gray-600 hover:text-purple-600 hover:underline text-small"
                href="/page-2"
              >
                Page 2
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* <!-- Start footer bottom --> */}

      <div className="pt-4 flex justify-center md:flex items-center border-t-2 border-purple-600">
        <ul className="text-center">
          <li
            className="sm:mx-2 sm:inline leading-7 text-sm"
            id="footer-navi-2"
          >
            <a
              className="text-gray-700  text-small hover:text-purple-600"
              href="/disclaimer"
            >
              Disclaimer
            </a>
          </li>
          <li
            className="sm:mx-2 sm:inline leading-7 text-sm"
            id="footer-navi-2"
          >
            <a
              className="text-gray-700  text-small hover:text-purple-600"
              href="/cookie"
            >
              Cookie policy
            </a>
          </li>
          <li
            className="sm:mx-2 sm:inline leading-7 text-sm"
            id="footer-navi-2"
          >
            <a
              className="text-gray-700  text-small hover:text-purple-600"
              href="/privacy"
            >
              Privacy
            </a>
          </li>
        </ul>
      </div>

      {/* <!-- end container --> */}
    </div>
  </footer>
)

export default Footer
