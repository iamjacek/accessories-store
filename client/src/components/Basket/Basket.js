import React, { useState, useEffect } from 'react'
import { calculatePrice, getBasket, setBasket } from '../utils'
import { Link } from "react-router-dom"



const Basket = ({ toAdd }) => {

    const [basketItems, setBasketItems] = useState([])
    

    const addToCart = (item) => {
        const alreadyInCart = basketItems.findIndex( cartItem => cartItem._id === item._id)
    
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

    

    useEffect(()=> {
      
        setBasket(basketItems)
      }, [basketItems])

     

      useEffect(() => {
        console.log(toAdd);
        if (toAdd) {
         addToCart(toAdd)
        }
        setBasketItems(getBasket())
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
        <div className="mt-6 mx-8 w-128 mx-auto">
        <div className="bg-gray-200">
          <div className="flex flex-col align-center px-8 py-4">
            <h2>Your Basket</h2>
              <p className="text-orange-500">{inTheBasket()} items selected</p>
              <div className="flex align-center justify-center flex-col">
                <div className="my-2">
                  {basketItems.length === 0 && (
                    <p className="text-red-700">Please add some items</p>
                  )}
                </div>
                {basketItems.map(item=> (
                  <div key={item._id} className="flex align-center mb-2">
                    <p>
                {item.name} x {item.quantity} - ${(item.quantity * item.price).toFixed(2)} <span onClick={() => deleteItemFromBasket(item._id)} className="cursor-pointer text-red-700 font-bold text-bold text-2xl whitespace-pre-wrap">{` `}&#x2715;</span>
                    </p>
                    
                  </div>
                ))}
                <p>Total: {calculatePrice(basketItems)}</p>
                <p>
                  <Link to="/checkout">Checkout</Link>
                </p>
              </div>
          </div>
        </div>
    </div>
    )
}

export default Basket
