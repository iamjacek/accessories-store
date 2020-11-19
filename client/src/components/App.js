import React, { useState } from "react";
import { Link } from "react-router-dom"
import search from '../assets/search.svg'
import Spinner from './Spinner'
import { filteredCats } from '../utils'

import './App.css';
import { useQuery, gql } from '@apollo/client';

const CATS = gql`
  query{
    cats{
      _id
      name
      description
      createdAt
      image{
        name
        url
      }
    }
  }
`

function App () {
  const apiUrl = process.env.API_URL || 'http://localhost:1337'
 
  const {loading, error, data } = useQuery(CATS)
  const [searchTerm, setSearchTerm] = useState('')


  if (loading) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <Spinner />
    </main>)
  if (error) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <p>Error :(</p>
    </main>)
 
  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }


  return (
    // Container
    <main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    
       

      {/* Categories */}
      <div className="flex flex-col justify-center mb-4 text-center">
        {/* Header */}
        <h1 className="text-3xl my-6 font-extrabold text-gray-700">CATEGORIES</h1>

        {/* SEARCH */}
        <div className="flex flex-row content-center justify-center self-center transform -translate-x-2">
        <img src={search} alt="search icon" className="h-4 mt-2 transform translate-x-6"/>
        <input className="h-8 text-sm shadow appearance-none border rounded w-full py-2 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="search" placeholder="Search" value={searchTerm} onChange={handleChange}/>
      </div>

        <div className="flex flex-wrap justify-center mb-6 mx-auto" style={{maxWidth: "1920px"}}>
          {filteredCats(searchTerm, data.cats).map((cat) => (
            <Link className="w-64 rounded overflow-hidden shadow-lg my-8 mx-3 text-left hover:shadow-2xl transition-shadow duration-200" key={cat._id} to={`/product/${cat._id}`}>
              <img className="w-full h-48 object-cover" src={`${apiUrl}${cat.image.url}`} alt={cat.image.name} />
              <div className="px-6 pt-3 pb-2">
                <div className="flex flex-col justify-between content-center">
                  <h2 className="text-2xl text-gray-900 font-bold mb-0 pb-1 leading-7"> {cat.name} </h2>
                  <span className="text-sm text-orange-500 font-bold mb-2 pt-0 ">{`Shop now >`}</span>
                </div>
                
                
              </div>
              
              
            </Link>
          ))}
        </div>
      
      </div>
    </main>
)}

export default App;