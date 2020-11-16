import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Spinner from './Spinner'
import { Link } from "react-router-dom"

const apiUrl = process.env.API_URL || 'http://localhost:1337'

const SingleItem = (props) => {

    const ITEM =gql`
        query{
            item (id: "${props.match.params.id}"){
            _id
            name
            description
            price
            subcategory
            image {
            url
            }
            cat {
            name
            _id
            }
        }
        }
    `

    const {loading, error, data } = useQuery(ITEM)
    
    if (loading) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <Spinner />
    </main>)
  if (error) return (<main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
    <p>Error :(</p>
    </main>)

    const { name, description, price, image, subcategory, cat } = data.item
    return (
        <main className="flex flex-col content-center flex-grow">
            <h1 className="text-xl mt-10 font-bold text-center text-gray-700">You're browsing {cat.name}</h1>
            <div className="text-center mt-6 flex flex-col-reverse sm:flex-row justify-around content-center">
            <button className="whitespace-pre-wrap shadow appearance-none border rounded bg-transparent hover:bg-gray-100 text-md leading-none text-gray-500 font-semibold px-4 py-2 border rounded mt-2 sm:mt-0 w-24 mx-auto sm:mx-0">
            <Link to={`/product/${cat._id}`}>{`<   Back`}</Link> 
            </button>
            <button className="w-48 whitespace-pre-wrap shadow appearance-none border rounded bg-transparent hover:bg-gray-100 text-sm text-gray-500 font-semibold px-4 py-2 border rounded mt-2 sm:mt-0 w-24 mx-auto sm:mx-0 mb-2 sm:mb-0">
            <Link to={`/`}>{`Change category`}</Link> 
            </button>
            
            </div>
            
            <div className="flex flex-col sm:flex-row content-center my-10 w-full sm:w-4/5 md:w-4/6 lg:w-1/2 mx-auto">
                
                
                
                {/* IMAGE */}
                <div className="flex justify-center items-center w-full sm:w-1/2 p-4">
                    <img className="w-64 h-64 object-cover align-center" src={`${apiUrl}${image.url}`} alt={image.name}/>
                    
                </div>
                {/* DESCRIPTION */}
                <div className="flex flex-col justify-center content-center w-full sm:w-1/2 py-4 px-10 sm:px-4">
                    <h1 className="text-2xl mb-1 font-bold leading-6 text-gray-700">{name}</h1>
                    <div className="flex flex-wrap flex-row justify-between items-center">
                    <p className="text-gray-700 content-center text-sm mb-2">★★★★★</p>
                    <p className="text-orange-500 text-2xl leading-7 p-2 w-24 text-center rounded-2xl font-black my-1">
                    £{price}
                </p>
                    </div>
                
                
                <p className="flex justify-center text-gray-700 text-md leading-6 py-1">{description}</p>
                <span className="my-1 text-sm font-semibold text-gray-500">Type: {subcategory}</span>
                
                
                <div className="flex flex-row">
                <button  className="w-full mx-1 mt-2 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-600 rounded">
                {`Add to basket`}
                </button>
                <button  className="w-full mx-1 mt-2 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-600 rounded">
                {`Buy`}
                </button>
                </div>
               
                </div>
                
            </div>
        </main>
    )
}

export default SingleItem
