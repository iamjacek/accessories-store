import React, { useState } from 'react'
import Alert from './Alert'
import axios from 'axios';

import { setToken } from '../utils'

const Signup = (props) => {

    const [inputValues, setInputValues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [alert, setAlert] = useState(false)
    const [alertMessage, setAllertMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setInputValues({
            ...inputValues,
            [name]: value
        })
    }

    const redirectUser = path => {
        props.history.push(path)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (isFormEmpty()){
            showAlert('Please fill all fields')
            return
        }
        setLoading(true)
        axios
            .post('http://localhost:1337/auth/local/register', {
                username: inputValues.username,
                email: inputValues.email,
                password: inputValues.password,
            })
            .then(response => {
                // Handle success.
                setLoading(false)
                setToken(response.data.jwt)
                // console.log('Well done!');
                // console.log('User profile', response.data.user);
                // console.log('User token', response.data.jwt);
                redirectUser('/')
            })
            .catch(error => {
                // Handle error.
                showAlert(error.response)
                console.log('An error occurred:', error.response);
                setLoading(false)
            });
    }

    const isFormEmpty = () => {
        return !inputValues.username || !inputValues.email || !inputValues.password
    }

    const showAlert = (alertMessage) => {
        setAllertMessage(alertMessage)
        setAlert(true)

        setTimeout(() => {
        setAlert(false)
        setAllertMessage('')
        }, 4000);
    }

    return(
            <div className="flex justify-center flex-grow w-full text-center">
                {/* SIGN UP */}

                <form className="relative mx-4 w-full sm:max-w-screen-sm md:max-w-screen-md flex flex-col bg-gray-200 py-8 px-4 md:px-12 my-12 rounded-lg" onSubmit={handleSubmit}>
                <Alert show={alert} message={alertMessage}/>
                    <div className="mb-2 flex flex-col align-center">
                        <h1 className="text-4xl font-bold text-gray-700">Get Started!</h1>
                        <p className="text-sm mt-0 mb-4 text-gray-700">Sign up to order phone accessories!</p>
                    </div>
                    {/* INPUT */}
                    <label className="text-left text-gray-700">
                        Username:
                        <input className="rounded w-full text-md text-gray-700 p-2 mb-2" id="username" type="text" name="username" placeholder="i.e. John1990" onChange={handleChange} />
                    </label>
                    <label className="text-left text-gray-700">
                        Email:
                        <input className="rounded w-full text-md text-gray-700 p-2 mb-2" id="email" type="email" name="email" placeholder="your@mail.com" onChange={handleChange} />    
                    </label>
                    <label className="text-left text-gray-700">
                        Password:
                       <input className="rounded w-full text-md text-gray-700 p-2 mb-2" id="password" type="password" name="password" placeholder="your password" onChange={handleChange} /> 
                    </label>
                    
                    <button type="submit" disabled={loading} className="mt-6 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-8 border-b-4 border-gray-700 hover:border-gray-600 rounded">Submit</button>
                    
                </form>
                
            </div>
        )
}

export default Signup
