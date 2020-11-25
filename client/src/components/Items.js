import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import Spinner from './Spinner'
import search from '../assets/search.svg'
import { filteredCats } from '../utils'

import { Link } from "react-router-dom"

const apiUrl = process.env.API_URL || 'http://localhost:1337'

const Items = ({passNewBasketItems, ...props}) => {

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

    const [searchTerm, setSearchTerm] = useState('')
    
    const {loading, error, data } = useQuery(ITEMS)

    const handleClick = (item) => {
      passNewBasketItems(item)
    }

    const handleChange = (event) => {
      setSearchTerm(event.target.value)
    }

    if (loading) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <Spinner />
    </main>)
  if (error) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full p-12">
    <p>Error :(</p>
    </main>)

    
    return (
        
         // Container
    <main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
   
       

    {/* Categories */}
    <div className="flex flex-col justify-center mb-4 text-center">
      {/* Header */}
      <h1 className="text-3xl my-6 font-extrabold text-gray-700">{data.cat.name.toUpperCase()}</h1>

      <div className="flex flex-col-reverse sm:flex-row justify-around content-center mb-4">
        
        <button className="whitespace-pre-wrap shadow appearance-none border rounded bg-transparent hover:bg-gray-100 text-md leading-none text-gray-500 font-semibold px-4 py-2 border rounded mt-6 sm:mt-0 w-24 mx-auto sm:mx-0">
         <Link to="/">{`<   Back`}</Link> 
        </button>
        {/* SEARCH */}
        <div className=" flex flex-row content-center justify-center self-center transform -translate-x-2">
        <img src={search} alt="search icon" className="h-4 mt-2 transform translate-x-6"/>
        <input className="text-sm shadow appearance-none border rounded w-full py-2 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="search" placeholder="Search" value={searchTerm} onChange={handleChange}/>
      </div>

      </div>
    

      

      <div className="flex flex-wrap justify-center mb-6 mx-auto" style={{maxWidth: "1920px"}}>
        {filteredCats(searchTerm, data.cat.items).map((item) => (
          <div className="w-64 flex flex-col rounded overflow-hidden my-8 mx-3 text-center transition-shadow duration-200" key={item._id}  >
            <Link to={`/item/${item._id}/${item.name}`}>
            
            <img className="w-full h-48 object-cover" src={`${apiUrl}${item.image.url}`} alt={item.image.name} />
            </Link>
            <div className="flex flex-col flex-grow">
            <div className="px-6 py-3 flex flex-col flex-grow">
              <Link to={`/item/${item._id}/${item.name}`}>
                <div className="flex flex-col justify-between content-center">
                  <h2 className="text-lg text-gray-900 font-bold mb-1 leading-7 h-12"> {item.name} </h2>
                </div>
              </Link>
              {/* <div className="flex py-1">
                <span className="inline-block bg-gray-200 rounded-full px-8 py-1 text-sm font-semibold text-gray-700">{item.subcategory}</span>
            </div> */}
              
              <p className="flex justify-center text-gray-700 text-sm leading-5 pt-0">★★★★★</p>
              <p className="flex justify-center text-orange-500 font-black text-2xl leading-5 p-2 font-bold">
                £{item.price}
              </p>
              
              <button onClick={() => handleClick(item)} className="mt-2 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-600 rounded">
              {`Add to basket`}
              </button>
            </div>
            
            
            </div>
            
            
          </div>
        ))}
      </div>
    </div>

    

  </main>
    )
}

export default Items
