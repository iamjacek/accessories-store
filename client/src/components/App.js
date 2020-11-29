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
        <h1 className="text-2xl my-6 font-medium text-gray-700 text-shadow">CATEGORIES</h1>

        {/* SEARCH */}
        <div className="flex flex-row content-center justify-center self-center transform -translate-x-2">
        <img src={search} alt="search icon" className="h-4 mt-2 transform translate-x-8"/>
        <input className="h-8 text-md shadow bg-white border-2 border-purple-600 font-semibold appearance-none rounded-full w-full py-2 pl-10 pr-3 text-gray-600 leading-tight focus:outline-none placeholder-gray focus:outline-white" type="search" placeholder="Search" value={searchTerm} onChange={handleChange}/>
      </div>

        <div className="flex flex-wrap justify-center mb-6 mx-auto" style={{maxWidth: "1920px"}}>
          {filteredCats(searchTerm, data.cats).map((cat) => (
            <Link className="w-48 rounded overflow-hidden shadow-lg my-8 mx-3 text-left hover:shadow-2xl transition-shadow duration-200" key={cat._id} to={`/product/${cat._id}`}>
              <img className="w-full h-40 object-cover" src={`${apiUrl}${cat.image.url}`} alt={cat.image.name} />
              <div className="px-4 py-2 border-top">
                <div className="flex flex-col justify-between content-center">
                  <h2 className="text-md text-gray-700 font-semibold mb-0 pb-1 leading-7 text-shadow"> {cat.name} </h2>
                  <span className="text-sm text-purple-600 font-bold mb-1 text-shadow">{`Shop now >`}</span>
                </div>
                
                
              </div>
              
              
            </Link>
          ))}
        </div>
      
      </div>
    </main>
)}

export default App;