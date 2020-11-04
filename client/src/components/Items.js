import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Spinner from './Spinner'

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


    const {loading, error, data } = useQuery(ITEMS)

    if (loading) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <Spinner />
    </main>)
  if (error) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <p>Error :(</p>
    </main>)
    console.log(data)
    return (
        
         // Container
    <main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
   
       

    {/* Categories */}
    <div className="flex flex-col justify-center mb-4 text-center">
      {/* Header */}
    <h1 className="text-4xl my-6 font-bold text-gray-700">Available products in {data.cat.name}</h1>

      {/* SEARCH */}
    {/* <div className="mb-4 flex flex-row content-center justify-center w-64 mx-auto transform -translate-x-2">
      <img src={search} alt="search icon" className="h-4 mt-3 transform translate-x-8"/>
      <input className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline" type="search" placeholder="Search" value={searchTerm} onChange={handleChange}/>
    </div> */}

      <div className="flex flex-wrap justify-center mb-6 mx-auto" style={{maxWidth: "1920px"}}>
        {data.cat.items.map((item) => (
          <Link className="max-w-sm rounded overflow-hidden shadow-lg my-8 mx-3 text-left hover:shadow-2xl transition-shadow duration-200" key={item._id} to={`/${item._id}`} >
            <img className="w-full h-56 object-cover" src={`${apiUrl}${item.image.url}`} alt={item.image.name} />
            <div className="px-6 py-5">
              <div className="flex flex-col sm:flex-row justify-between content-center">
                <h2 className="text-2xl text-gray-900 font-bold mb-0 sm:mb-1 pb-2 sm:pb-2"> {item.name} </h2>
                <span className="text-xl text-orange-500 font-bold mb-2 pt-0 sm:pt-1">{`Shop now >`}</span>
              </div>
              
              <p className="text-gray-700 leading-7"> {item.description} </p>
              
            </div>
            <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.subcategory}</span>
            </div>
            
          </Link>
        ))}
      </div>
    
    </div>
  </main>
    )
}

export default Items
