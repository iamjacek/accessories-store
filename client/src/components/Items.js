import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import Spinner from './Spinner'
import search from '../assets/search.svg'
import { filteredCats } from './utils'

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
    useEffect(() => {
      window.scrollTo({top:0,behavior:'smooth'})
    }, [])

    const [searchTerm, setSearchTerm] = useState('')
    const {loading, error, data } = useQuery(ITEMS)

    const handleChange = (event) => {
      setSearchTerm(event.target.value)
    }

    if (loading) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <Spinner />
    </main>)
  if (error) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <p>Error :(</p>
    </main>)

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
          <Link className="max-w-xs rounded overflow-hidden shadow-lg my-8 mx-3 text-left hover:shadow-2xl transition-shadow duration-200" key={item._id} to={`/${item._id}`} >
            <img className="w-full h-48 object-cover" src={`${apiUrl}${item.image.url}`} alt={item.image.name} />
            <div className="flex flex-col">
            <div className="px-6 py-5 flex flex-grow flex-col">
              <div className="flex flex-col justify-between content-center mb-2">
                <h2 className="text-2xl text-gray-900 font-bold mb-0 pb-1 leading-7"> {item.name} </h2>
                
              </div>
              <div className="flex py-1">
                <span className="inline-block bg-gray-200 rounded-full px-8 py-1 text-sm font-semibold text-gray-700">{item.subcategory}</span>
            </div>
              
              <p className="flex text-gray-700 text-sm leading-5 pt-2"> {item.description} </p>
              <span className="text-sm text-orange-500 font-bold mb-2 pt-2 ">{`Buy >`}</span>
            </div>
            
            
            </div>
            
            
          </Link>
        ))}
      </div>
    
    </div>
  </main>
    )
}

export default Items
