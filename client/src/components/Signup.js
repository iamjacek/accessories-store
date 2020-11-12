import React, { useState } from 'react'

const Signup = () => {

    const [inputValues, setInputValues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setInputValues({
            ...inputValues,
            [name]: value
        })
    }

    return(
            <div className="container flex-grow mx-auto text-center">
                {/* SIGN UP */}

                <form className="max-w-xl flex flex-col mx-auto bg-gray-200 p-8 my-12 rounded-lg">
                    <div className="mb-2 flex flex-col align-center">
                        <h1 className="text-4xl font-bold text-gray-700">Get Started!</h1>
                        <p className="text-sm mt-0 mb-4 text-gray-700">Sign up to order phone accessories!</p>
                    </div>
                    {/* INPUT */}
                    <label className="text-left text-gray-700">
                        Username:
                        <input className="w-full text-md text-gray-700 p-2 mb-2" id="username" type="text" name="username" placeholder="i.e. John1990" onChange={handleChange} />
                    </label>
                    <label className="text-left text-gray-700">
                        Email:
                        <input className="w-full text-md text-gray-700 p-2 mb-2" id="email" type="email" name="email" placeholder="your@mail.com" onChange={handleChange} />    
                    </label>
                    <label className="text-left text-gray-700">
                        Password:
                       <input className="w-full text-md text-gray-700 p-2 mb-2" id="password" type="password" name="password" placeholder="your password" onChange={handleChange} /> 
                    </label>
                    
                    <button type="submit" className="mt-6 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-8 border-b-4 border-gray-700 hover:border-gray-600 rounded">Submit</button>
                </form>
            </div>
        )
}

export default Signup
