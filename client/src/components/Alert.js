import React from 'react'

const Alert = ({ show, message }) => {
    return (
        show && (<div className="fixed top-0 mt-12 px-12 py-4 rounded-lg font-bold top-100 center-absolute bg-red-700">
            <p className="text-2xl text-white">{message}</p>
        </div>)
    )
}

export default Alert