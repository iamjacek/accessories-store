import React from 'react'

const spinner = () => {
  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-white" >
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
    </div>
    
  )
}

export default spinner
