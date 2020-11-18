import React, { useState } from 'react'
import Alert from './Alert'

const Checkout = () => {

    const [inputValues, setInputValues] = useState({
        fullName: '',
        address: '',
        postCode: '',
        city: '',
        confirmationEmail: '',
    })

    const [alert, setAlert] = useState(false)
    const [alertMessage, setAllertMessage] = useState('')
    // const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setInputValues({
            ...inputValues,
            [name]: value
        })
    }

    const handleConfirmOrder = event => {
        event.preventDefault()
        if (isFormEmpty()){
            showAlert('Please fill all fields')
            return
        }
    }

    const isFormEmpty = () => {
        return !inputValues.fullName || !inputValues.address || !inputValues.postCode || !inputValues.city || !inputValues.confirmationEmail
    }

    const showAlert = (alertMessage) => {
        setAllertMessage(alertMessage)
        setAlert(true)

        setTimeout(() => {
        setAlert(false)
        setAllertMessage('')
        }, 4000);
    }

    return (
        <div className="flex justify-center flex-grow w-full text-center">
                {/* checkout */}

                <form className="relative mx-4 w-full sm:max-w-screen-sm md:max-w-screen-md flex flex-col bg-gray-200 py-8 px-4 md:px-12 my-12 rounded-lg" onSubmit={handleConfirmOrder}>
                <Alert show={alert} message={alertMessage}/>
                    <div className="mb-2 flex flex-col align-center">
                        <h1 className="text-4xl font-bold text-gray-700">Checkout</h1>
                        
                    </div>
                    {/* INPUT */}
                    <label className="text-left text-gray-700">
                        Full name:
                        <input className="rounded w-full text-md text-gray-700 p-2 mb-2" id="fullName" type="text" name="fullName" placeholder="i.e. John Smith" onChange={handleChange} />
                    </label>
                    <label className="text-left text-gray-700">
                        Shipping address:
                        <input className="rounded w-full text-md text-gray-700 p-2 mb-2" id="address" type="text" name="address" placeholder="i.e. 22 London Avenue" onChange={handleChange} />
                    </label>
                    <label className="text-left text-gray-700">
                        Post Code:
                        <input className="rounded w-full text-md text-gray-700 p-2 mb-2" id="postCode" type="text" name="postCode" placeholder="i.e. L16 2NP" onChange={handleChange} />    
                    </label>
                    <label className="text-left text-gray-700">
                        City:
                       <input className="rounded w-full text-md text-gray-700 p-2 mb-2" id="city" type="text" name="city" placeholder="i.e. London" onChange={handleChange} /> 
                    </label>
                    <label className="text-left text-gray-700">
                        Email (when we will send confirmation):
                       <input className="rounded w-full text-md text-gray-700 p-2 mb-2" id="confirmationEmail" type="email" name="confirmationEmail" placeholder="i.e. your@addres.com" onChange={handleChange} /> 
                    </label>
                    
                    <button type="submit" disabled={false} className="mt-6 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-8 border-b-4 border-gray-700 hover:border-gray-600 rounded">Submit</button>
                    
                </form>
                
            </div>
    )
}

export default Checkout
