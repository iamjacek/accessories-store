import React, { useState, useEffect } from 'react'
import Alert from './Alert'
import { getBasket } from '../utils'
import { calculatePrice } from '../utils'
import { Link } from "react-router-dom"
import Spinner from './Spinner'

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
    const [basketItems, setBasketItems] = useState([])
    const [orderProcessing, setOrderProcessing] = useState(false)
    const [modal, setModal] = useState(false)

   

    useEffect(() => {
        console.log(localStorage);
        setBasketItems(getBasket())
    }, [])

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
            showAlert('Please fill all fields!')
            return
        }

        setModal(true)
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

    const inTheBasket = () => {
        let sum = 0
        basketItems.map(item => sum += item.quantity)
        return sum
      }

      const handleSubmitOrder = () => {

      }

      const closeModal = () => {
          setModal(false)
      }

    return (
        <main className="flex flex-col justify-center items-center flex-grow w-full text-center">
                {/* checkout */}
                <div className="flex flex-col align-center">
                        <h1 className="text-3xl my-6 font-extrabold text-gray-700">CHECKOUT</h1>
                </div>
                {basketItems.length > 0 ? <React.Fragment>
                    <div className="align-center mx-4 sm:max-w-screen-sm md:max-w-screen-md flex flex-col bg-gray-200 py-8 px-4 md:px-12 rounded-lg">
                        <p className="text-orange-500 flex justify-center font-semibold text-lg mb-4">{inTheBasket()} items for checkout</p>

                        <div className="flex justify-center flex-col">
                        {basketItems.map(item => (
                    <div key={item._id} className="flex content-center mb-2 px-4 py-1 rounded-lg">
                        <div className="text-gray-700 text-md flex content-center justify-between">
                            <div>
                                {item.name} x {item.quantity} - 
                            </div>
                            <span className="text-gray-800 font-semibold">
                                ${(item.quantity * item.price).toFixed(2)}
                            </span> 
                        </div>
                        
                    </div>))}
                    </div>

                        <p className="flex justify-center text-2xl font-extrabold py-1 text-red-700">Total: {calculatePrice(basketItems)}</p>
                    
                    </div>

                    <form className="align-center mx-4 sm:max-w-screen-sm md:max-w-screen-md flex flex-col bg-gray-200 py-8 px-4 md:px-12 my-12 rounded-lg" onSubmit={handleConfirmOrder}>
                <Alert show={alert} message={alertMessage}/>
                    
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
                    
                    <button type="submit" disabled={false} className="mt-10 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-8 border-b-4 border-gray-700 hover:border-gray-600 rounded">Submit</button>
                    
                </form>
                </React.Fragment> : (
                    <div className="my-12 align-center mx-4 sm:max-w-screen-sm md:max-w-screen-md flex flex-col bg-gray-200 py-8 px-4 md:px-12 rounded-lg">
                        <h2 className="text-xl my-2 font-extrabold text-red-700">Your basket is empty</h2>
                        <p className="text-sm my-1 text-gray-600">Add some accessories!</p>
                        <Link to="/" type="submit" className="mt-10 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-8 border-b-4 border-gray-700 hover:border-gray-600 rounded">Browse</Link>
                    </div>
                ) } 

                {/* CONFIRMATION MODAL */}
                {modal && (
                    <ConfirmationModal basketItems={basketItems} orderProcessing={orderProcessing} closeModal={closeModal} handleSubmitOrder={handleSubmitOrder} />
                )}
            </main>
    )
}

const ConfirmationModal = ({orderProcessing, closeModal, handleSubmitOrder, basketItems}) => (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-75 flex content-center justify-center">

        <div className="bg-white p-8 max-w-2xl rounded-xl mt-auto mb-auto" onBlur={closeModal}>
            <h2 className="text-3xl font-extrabold py-1 text-gray-700">Confirm Your Order</h2>
             {/* SPINNER */}
        {orderProcessing && (
            <>
            <div className="mt-8">
                <Spinner />
            </div>
            <h2 className="text-xl font-semibold mt-12 mb-2 text-gray-700">Please wait while we are taking your order and processing a payment...</h2>
            </>
            )}
            {!orderProcessing && (
                <>
                <div className="flex flex-col mx-2 rounded-xl p-2 content-center items-center bg-gray-200 my-4">
                    {basketItems.map(item => (
                        <div key={item._id} className="px-1 py-1">
                            <span className="text-gray-700">
                            {item.name} x {item.quantity} - </span><span className="text-red-700 font-semibold">${(item.quantity * item.price).toFixed(2)}</span>
                            
                        </div>
                    ))}
                    <div>
                        <p className="text-2xl font-extrabold py-1 text-red-700">Total: {calculatePrice(basketItems)}</p>
                    </div>
                </div>
                    <div className="flex justify-center">
                            <div className="p-2 flex flex-row justify-center">
                                <button disabled={orderProcessing} className="bg-red-700 text-white mx-2 px-8 py-3 rounded-md" onClick={handleSubmitOrder} >Pay Now</button>
                                <button disabled={orderProcessing} className="bg-gray-300 text-gray-700 mx-2 px-8 py-3 rounded-md" onClick={closeModal} >Cancel</button>
                            </div>
                    </div>
               </>
            )}
            
        </div> 
       
    </div>
)

export default Checkout
