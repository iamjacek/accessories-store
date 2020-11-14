import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Spinner from './Spinner'

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
    console.log(data);
    const { name, description, price, image, subcategory, cat } = data.item
    return (
        <div className="flex flex-grow content-center my-10 w-1/2 mx-auto">
            {/* IMAGE */}
            <div className="flex justify-center items-center w-1/2 p-4">
                <img className="w-full object-cover align-center" src={`${apiUrl}${image.url}`} alt={image.name}/>
                
            </div>
             {/* DESCRIPTION */}
            <div className="flex flex-col justify-center content-center w-1/2 p-4">
                <h1 className="text-4xl my-6 font-bold text-gray-700">{name}</h1>
               
                <span className="inline-block bg-gray-200 rounded-full px-8 py-1 text-sm font-semibold text-gray-700">{subcategory}</span>
            
              
              <p className="flex justify-center text-gray-700 text-sm leading-5 pt-0 flex-grow">★★★★★</p>
              <p className="flex justify-center text-gray-900 text-lg leading-5 pt-1">{description}</p>
              <p className="flex justify-center text-gray-900 text-lg leading-5 pt-1 font-bold">
                £{price}
              </p>
              
              <button  className="mt-2 mb-1 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-600 rounded">
              {`Add to basket`}
              </button>
            </div>
            
        </div>
    )
}

export default SingleItem
