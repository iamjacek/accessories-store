import React, { useState, useEffect } from "react"
import { calculatePrice, getBasket, setBasket } from "../../utils"
import { Link } from "react-router-dom"
import x from "../../assets/cancel.svg"

const Basket = ({ toAdd, basketOpen, toggleBasketItself }) => {
  const [basketItems, setBasketItems] = useState([])

  const addToCart = (item) => {
    if (item._id) {
      const alreadyInCart = basketItems.findIndex(
        (basketItem) => basketItem._id === item._id
      )

      if (alreadyInCart === -1) {
        const updatedItems = basketItems.concat({
          ...item,
          quantity: 1,
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
  useEffect(() => {
    setBasket(basketItems)
  }, [basketItems])

  //get basket from props
  useEffect(() => {
    if (toAdd.item) addToCart(toAdd.item)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toAdd])

  const inTheBasket = () => {
    let sum = 0
    basketItems.map((item) => (sum += item.quantity))
    return sum
  }

  const deleteItemFromBasket = (itemToDeleteId) => {
    const updatedItems = basketItems.filter(
      (item) => item._id !== itemToDeleteId
    )
    setBasketItems(updatedItems)
  }

  return (
    <div
      className={
        basketOpen
          ? "absolute opacity-1 z-50 w-full transition-opacity duration-300 top-24 right-0 left-0"
          : "absolute opacity-0 z-50 w-full transition-opacity duration-300 top-24 right-0 left-0 transform -translate-x-full"
      }
    >
      <div className="bg-white border border-4 border-gray-700 rounded-3xl mx-4 sm:mx-12 mt-4 py-4">
        <div className="flex flex-col align-center px-2 py-4">
          <div
            onClick={toggleBasketItself}
            className="absolute cursor-pointer close-basket flex flex-row mx-4 sm:mx-12 items-center bg-gray-100 p-2 rounded-xl"
          >
            <img src={x} alt="close button" className="w-5 h-5" />
          </div>
          <h2 className="flex justify-center py-1 text-2xl font-medium text-gray-700">
            YOUR BASKET
          </h2>
          <p className="text-gray-500 flex justify-center font-medium text-md">
            {inTheBasket()} item{inTheBasket() > 1 ? "s" : ""} selected
          </p>
          <div className="flex align-center justify-center flex-col">
            <div className="my-4">
              {basketItems.length === 0 && (
                <p className="text-purple-600 text-center py-4">
                  Add some items to checkout
                </p>
              )}
            </div>
            {basketItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-2 px-4 py-1 mx-0 sm:mx-2 md:mx-4 lg:mx-8 py-0 rounded-lg bg-gray-100"
              >
                <div className="whitespace-pre-wrap text-gray-800 text-md flex flex-wrap">
                  {item.name} x {item.quantity} -
                  <span className="text-gray-700 text-md font-semibold">
                    {" "}
                    £{(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
                <span
                  onClick={() => deleteItemFromBasket(item._id)}
                  className="flex ml-4 self-center cursor-pointer text-red-700 font-bold text-bold text-2xl whitespace-pre-wrap"
                >
                  {` `}&#x2715;
                </span>
              </div>
            ))}
            <p className="flex justify-center text-gray-700 font-racing font-medium text-2xl leading-6 py-1 mt-4">
              Total: {calculatePrice(basketItems)}
            </p>
            <p className="flex justify-center">
              <Link to="/checkout">
                {basketItems.length === 0 && (
                  <button
                    disabled
                    className="mt-2 mb-1 button-beep leading-none bg-purple-600 text-md text-white font-semibold py-2 px-8 rounded-full opacity-50 cursor-not-allowed"
                  >
                    {`Checkout`}
                  </button>
                )}
                {basketItems.length > 0 && (
                  <button className="mt-2 mb-1 button-beep leading-none bg-purple-600 text-md text-white font-semibold py-2 px-8 rounded-full">
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
