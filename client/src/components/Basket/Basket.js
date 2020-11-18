import React, { useState, useEffect } from 'react'
import { calculatePrice, getBasket, setBasket } from '../../utils'
import { Link } from "react-router-dom"



const Basket = ({ toAdd }) => {

    const [basketItems, setBasketItems] = useState([])
    

    const addToCart = (item) => {
      if (item._id){
        const alreadyInCart = basketItems.findIndex( basketItem => basketItem._id === item._id)
        
        if (alreadyInCart === -1){
          const updatedItems = basketItems.concat({
            ...item,
            quantity: 1
          })
          setBasketItems(updatedItems)
        } else {
          const updatedItems = [...basketItems]
          updatedItems[alreadyInCart].quantity += 1
          setBasketItems(updatedItems)
        }
      }
    }

      useEffect(() => {
        setBasketItems(getBasket())
      }, [])

      //basket to localstorage
      useEffect(()=> {
        setBasket(basketItems)
      }, [basketItems])

      //get basket from props
      useEffect(() => {
        if (toAdd.item) addToCart(toAdd.item)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [toAdd])

      const inTheBasket = () => {
        let sum = 0
        basketItems.map(item => sum += item.quantity)
        return sum
      }
  
      const deleteItemFromBasket = (itemToDeleteId) => {
        const updatedItems = basketItems.filter(item => item._id !== itemToDeleteId)
        setBasketItems(updatedItems)
      }
      

      
    return (
        <div className="mt-6 mx-4 w-128 mx-auto">
        <div className="bg-gray-200 rounded">
          <div className="flex flex-col align-center px-2 py-4">
            <h2 className="flex justify-center text-3xl font-extrabold py-1 text-gray-700">Your Basket</h2>
              <p className="text-orange-500 flex justify-center font-semibold text-lg">{inTheBasket()} items selected</p>
              <div className="flex align-center justify-center flex-col">
                <div className="my-2">
                  {basketItems.length === 0 && (
                    <p className="text-red-700 text-center py-4">Add some items to checkout</p>
                  )}
                </div>
                {basketItems.map(item => (
                  <div key={item._id} className="flex align-center mb-2 px-4 py-1 rounded-lg bg-gray-100">
                    <p className="text-gray-900 text-md">
                {item.name} x {item.quantity} - <span className="font-semibold">${(item.quantity * item.price).toFixed(2)}</span> <span onClick={() => deleteItemFromBasket(item._id)} className="cursor-pointer text-red-700 font-bold text-bold text-2xl whitespace-pre-wrap">{` `}&#x2715;</span>
                    </p>
                    
                  </div>
                ))}
                <p className="flex justify-center text-2xl font-extrabold py-1 text-red-700">Total: {calculatePrice(basketItems)}</p>
                <p className="flex justify-center">
                  <Link to="/checkout" >
                  {basketItems.length === 0 && (
                    <button disabled className="mt-2 mb-1 bg-orange-500 border-b-4 border-gray-700 text-white font-bold py-2 px-8 rounded opacity-50 cursor-not-allowed">
                    {`Checkout`}
                    </button>
                  )}
                  {basketItems.length > 0 && (
                    <button className="mt-2 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-8 border-b-4 border-gray-700 hover:border-gray-600 rounded">
                    {`Checkout`}
                    </button>
                  )}
                  
                  
                  </Link>
                </p>
              </div>
          </div>
        </div>
    </div>
    )
}

export default Basket
