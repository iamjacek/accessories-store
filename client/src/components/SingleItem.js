import React from "react"
import { useQuery, gql } from "@apollo/client"
import Spinner from "./Spinner"
import { Link } from "react-router-dom"
import basketIcon from "../assets/shopping-cart.svg"

const apiUrl = process.env.API_URL || "http://localhost:1337"

const SingleItem = ({ passNewBasketItems, ...props }) => {
  const ITEM = gql`
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

  const { loading, error, data } = useQuery(ITEM)

  const handleClick = (item) => {
    passNewBasketItems(item)
  }

  if (loading)
    return (
      <main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
        <Spinner />
      </main>
    )
  if (error)
    return (
      <main className="container text-xl mx-auto px-4 sm:px-8 flex-grow max-w-full flex items-center justify-center">
        <p className="bg-gray-100 px-8 py-3 rounded-xl">
          Error, please contact our support or try again later.
        </p>
      </main>
    )

  const { name, description, price, image, subcategory, cat } = data.item
  return (
    <main className="flex flex-col content-center flex-grow">
      <h1 className="text-2xl text-center my-6 font-medium text-gray-700 text-shadow">
        You're in {cat.name}
      </h1>
      <div className="text-center flex flex-col-reverse sm:flex-row justify-around content-center">
        <Link to={`/product/${cat._id}`}>
          <button className="button-beep shadow appearance-none rounded-full border-2 border-purple-600 button text-md leading-none text-gray-600 font-semibold px-8 h-8 sm:mt-0 mx-auto sm:mx-0">
            Back
          </button>
        </Link>
        <Link to={`/`}>
          <button className="button-beep shadow appearance-none rounded-full border-2 border-purple-600 button text-md leading-none text-gray-600 font-semibold px-8 h-8 mx-auto sm:mx-0 sm:mb-0 mb-4">
            Change category
          </button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row content-center my-10 w-full lg:w-4/5 xl:w-4/6 mx-auto px-0 sm:px-4 md:px-12">
        {/* IMAGE */}
        <div className="flex justify-center items-center w-full sm:w-1/2 p-4">
          <img
            className="w-64 h-64 object-cover align-center"
            src={`${apiUrl}${image.url}`}
            alt={image.name}
          />
        </div>
        {/* DESCRIPTION */}
        <div className="flex flex-col justify-center content-center w-full sm:w-1/2  py-4 px-8 sm:px-4">
          <h1 className="text-xl text-gray-700 font-semibold leading-5 text-shadow">
            {name}
          </h1>
          <div className="flex flex-wrap flex-row justify-between items-center pt-4 pb-1">
            <p className="content-center text-purple-600 text-md">★★★★★</p>
            <p className="text-gray-700 font-racing font-medium text-shadow text-2xl leading-6">
              £{price}
            </p>
          </div>
          <span className="my-2 text-sm font-semibold text-gray-500">
            Type: {subcategory}
          </span>
          <p className="flex text-left flex-grow text-gray-700 text-md leading-6">
            {description}
          </p>

          <div className="flex flex-row mt-4">
            <button
              onClick={() => handleClick(data.item)}
              className="button-beep mx-2 w-1/2 shadow appearance-none rounded-full bg-purple-600 button text-md leading-none text-white font-semibold px-8 py-2"
            >
              {`Add to basket`}
            </button>
            <button className="button-beep mx-2 w-1/2 shadow appearance-none rounded-full bg-purple-600 button text-md leading-none text-white font-semibold px-8 py-2">
              <span className="flex flex-row justify-center items-center">
                <img
                  className="h-6 pr-4 fill-white"
                  src={basketIcon}
                  alt="basket"
                />
                Buy
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SingleItem
