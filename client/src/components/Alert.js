import React from "react"
import Spinner from "./Spinner"

const Alert = ({ show, message, closeAlert, closeMessageAndGoHome }) => {
  return (
    show && (
      <div className="z-50 fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex content-center justify-center">
        <div className="bg-white px-2 py-4 sm:px-8 sm:py-12 max-w-md md:max-w-lg lg:max-w-2xl border border-4 border-gray-700 rounded-3xl my-auto mx-4 sm:mx-12">
          <p className="text-xl text-gray-700 mb-6">{message}</p>
          {closeAlert && (
            <button
              onClick={closeMessageAndGoHome}
              className="leading-none font-semibold text-md mt-1 mb-1 bg-purple-600 button-beep text-white py-2 px-12 rounded-full shadow"
            >
              OK
            </button>
          )}
          {!closeAlert && <Spinner />}
        </div>
      </div>
    )
  )
}

export default Alert
