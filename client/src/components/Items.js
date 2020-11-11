import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import Spinner from './Spinner'
import search from '../assets/search.svg'
import { filteredCats, calculatePrice, getBasket, setBasket } from './utils'

import { Link } from "react-router-dom"

const apiUrl = process.env.API_URL || 'http://localhost:1337'

const Items = (props) => {

    const ITEMS = gql`
    query{
        cat(id: "${props.match.params.id}"){
          _id
          name
          items{
            _id
            name
            price
            subcategory
            description
            image{
              url
            }
            
          }
        }
      }
`
    //just to scroll to the top each time user clicked category
   

  

    const [searchTerm, setSearchTerm] = useState('')
    const [cartItems, setCartItem] = useState([])
    const {loading, error, data } = useQuery(ITEMS)

    useEffect(() => {
      window.scrollTo({top:0,behavior:'smooth'})
      setCartItem(getBasket())
    }, [])

    useEffect(()=> {
      setBasket(cartItems)
    }, [cartItems])

    const handleChange = (event) => {
      setSearchTerm(event.target.value)
    }

    if (loading) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <Spinner />
    </main>)
  if (error) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <p>Error :(</p>
    </main>)

    const addToCart = (item) => {
      const alreadyInCart = cartItems.findIndex( cartItem => cartItem._id === item._id)

      if (alreadyInCart === -1){
        const updatedItems = cartItems.concat({
          ...item,
          quantity: 1
        })
        setCartItem(updatedItems)
      } else {
        const updatedItems = [...cartItems]
        updatedItems[alreadyInCart].quantity += 1
        setCartItem(updatedItems)
      }
    }

    const inTheBasket = () => {
      let sum = 0
      cartItems.map(item => sum += item.quantity)
      return sum
    }

    const deleteItemFromBasket = (itemToDeleteId) => {
      const updatedItems = cartItems.filter(item => item._id !== itemToDeleteId)
      setCartItem(updatedItems)
    }

    return (
        
         // Container
    <main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
   
       

    {/* Categories */}
    <div className="flex flex-col justify-center mb-4 text-center">
      {/* Header */}
      <h1 className="text-4xl my-6 font-bold text-gray-700">{data.cat.name.toUpperCase()}</h1>

      <div className="flex flex-col-reverse sm:flex-row justify-around content-center mb-4">
        
        <button className="whitespace-pre-wrap shadow appearance-none border rounded bg-transparent hover:bg-gray-100 text-md leading-none text-gray-500 font-semibold px-4 py-2 border rounded mt-6 sm:mt-0 w-24 mx-auto sm:mx-0">
         <Link to="/">{`<   Back`}</Link> 
        </button>
        {/* SEARCH */}
        <div className=" flex flex-row content-center justify-center self-center transform -translate-x-2">
        <img src={search} alt="search icon" className="h-4 mt-3 transform translate-x-8"/>
        <input className="shadow appearance-none border rounded w-full h-10 py-2 pl-10 pr-3 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline" type="search" placeholder="Search" value={searchTerm} onChange={handleChange}/>
      </div>

      </div>
    

      

      <div className="flex flex-wrap justify-center mb-6 mx-auto" style={{maxWidth: "1920px"}}>
        {filteredCats(searchTerm, data.cat.items).map((item) => (
          <div className="w-64 flex flex-col rounded overflow-hidden my-8 mx-3 text-center transition-shadow duration-200" key={item._id} to={`/${item._id}`} >
            <img className="w-full h-48 object-cover" src={`${apiUrl}${item.image.url}`} alt={item.image.name} />
            <div className="flex flex-col flex-grow">
            <div className="px-6 py-3 flex flex-col flex-grow">
              <div className="flex flex-col justify-between content-center">
                <h2 className="text-lg text-gray-900 font-bold mb-0 leading-7"> {item.name} </h2>
                
              </div>
              {/* <div className="flex py-1">
                <span className="inline-block bg-gray-200 rounded-full px-8 py-1 text-sm font-semibold text-gray-700">{item.subcategory}</span>
            </div> */}
              
              <p className="flex justify-center text-gray-700 text-sm leading-5 pt-0 flex-grow">★★★★★</p>
              <p className="flex justify-center text-gray-900 text-lg leading-5 pt-1 font-bold">
                £{item.price}
              </p>
              
              <button onClick={() => addToCart(item)} className="mt-2 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-600 rounded">
              {`Add to basket`}
              </button>
            </div>
            
            
            </div>
            
            
          </div>
        ))}
      </div>
    </div>
    {/* USER BASKET */}

    

    <div className="mt-2 ml-8">
        <div className="bg-gray-200">
          <div className="flex flex-col align-center p-2">
            <h2>Your Basket</h2>
              <p className="text-orange-500">{inTheBasket()} items selected</p>
              <div className="flex align-center justify-center flex-col">
                <div className="my-2">
                  {cartItems.length === 0 && (
                    <p className="text-red-700">Please add some items</p>
                  )}
                </div>
                {cartItems.map(item=> (
                  <div key={item._id} className="flex align-center mb-2">
                    <p>
                {item.name} x {item.quantity} - ${(item.quantity * item.price).toFixed(2)} <span onClick={() => deleteItemFromBasket(item._id)} className="cursor-pointer text-red-700 font-bold text-bold text-2xl whitespace-pre-wrap">{` `}&#x2715;</span>
                    </p>
                    
                  </div>
                ))}
                <p>Total: {calculatePrice(cartItems)}</p>
                <p>
                  <Link to="/checkout">Checkout</Link>
                </p>
              </div>
          </div>
        </div>
    </div>

  </main>
    )
}

export default Items
