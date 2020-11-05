import React, { useState } from "react";
import { Link } from "react-router-dom"
import search from '../assets/search.svg'
import Spinner from './Spinner'
import { filteredCats } from './utils'

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

  //get data into state if u need later
  // const [categories, setCategories] = useState()
  // useEffect(() => {
  //   if(loading === false && data){
  //     setCategories(data);
  //   }
  // }, [loading, data])

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
        <h1 className="text-4xl my-6 font-bold text-gray-700">CATEGORIES</h1>

        {/* SEARCH */}
        <div className=" flex flex-row content-center justify-center self-center transform -translate-x-2">
        <img src={search} alt="search icon" className="h-4 mt-3 transform translate-x-8"/>
        <input className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline" type="search" placeholder="Search" value={searchTerm} onChange={handleChange}/>
      </div>

        <div className="flex flex-wrap justify-center mb-6 mx-auto" style={{maxWidth: "1920px"}}>
          {filteredCats(searchTerm, data.cats).map((cat) => (
            <Link className="max-w-xs rounded overflow-hidden shadow-lg my-8 mx-3 text-left hover:shadow-2xl transition-shadow duration-200" key={cat._id} to={`/${cat._id}`} >
              <img className="w-full h-48 object-cover" src={`${apiUrl}${cat.image.url}`} alt={cat.image.name} />
              <div className="px-6 py-5">
                <div className="flex flex-col justify-between content-center">
                  <h2 className="text-2xl text-gray-900 font-bold mb-0 pb-1 leading-7"> {cat.name} </h2>
                  <span className="text-sm text-orange-500 font-bold mb-2 pt-0 ">{`Shop now >`}</span>
                </div>
                
                <p className="text-gray-700 text-sm leading-5"> {cat.description} </p>
                
              </div>
              {/* <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
              </div> */}
              
            </Link>
          ))}
        </div>
      
      </div>
    </main>
)}

export default App;