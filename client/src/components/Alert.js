import React from "react"

const Alert = ({ show, message }) => {
  return (
    show && (
      <div className="z-50 fixed mt-12 px-12 py-4 rounded-lg font-bold top-150 center-absolute bg-purple-600">
        <p className="text-2xl text-white">{message}</p>
      </div>
    )
  )
}

export default Alert
