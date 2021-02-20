import React, { useState } from "react"
import { useQuery, gql } from "@apollo/client"
import Spinner from "./Spinner"
import search from "../assets/search.svg"
import { filteredCats } from "../utils"

import { Link } from "react-router-dom"

const apiUrl = "https://accessories.herokuapp.com"

const Items = ({ passNewBasketItems, ...props }) => {
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

  const [searchTerm, setSearchTerm] = useState("")

  const { loading, error, data } = useQuery(ITEMS)

  const handleClick = (item) => {
    passNewBasketItems(item)
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
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

  return (
    // Container
    <main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
      {/* Categories */}
      <div className="flex flex-col justify-center mb-4 text-center">
        {/* Header */}
        <h1 className="text-2xl my-6 font-medium text-gray-700 text-shadow">
          {data.cat.name.toUpperCase()}
        </h1>

        <div className="flex flex-col-reverse sm:flex-row justify-around content-center mb-4">
          <Link to="/">
            <button className="button-beep shadow appearance-none rounded-full border-2 border-purple-600 button text-md leading-none text-gray-600 font-semibold px-8 h-8 mt-6 sm:mt-0 mx-auto sm:mx-0">
              Back
            </button>
          </Link>
          {/* SEARCH */}
          <div className=" flex flex-row content-center justify-center self-center transform -translate-x-2">
            <img
              src={search}
              alt="search icon"
              className="h-4 mt-2 transform translate-x-8"
            />
            <input
              className="h-8 text-md shadow bg-white border-2 border-purple-600 font-semibold appearance-none rounded-full w-full py-2 pl-10 pr-3 text-gray-600 leading-tight focus:outline-none placeholder-gray focus:outline-white"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </div>

        <div
          className="flex flex-wrap justify-center mb-6 mx-auto py-12"
          style={{ maxWidth: "1920px" }}
        >
          {filteredCats(searchTerm, data.cat.items).map((item) => (
            <div
              className="w-40 flex flex-col rounded overflow-hidden my-4 mx-3 text-center transition-shadow duration-200"
              key={item._id}
            >
              <Link to={`/item/${item._id}/${item.name}`}>
                <img
                  className="w-full h-40 object-cover"
                  src={`${apiUrl}${item.image.url}`}
                  alt={item.image.name}
                />
              </Link>
              <div className="flex flex-col flex-grow">
                <div className="py-2 flex flex-col flex-grow">
                  <Link to={`/item/${item._id}/${item.name}`}>
                    <div className="flex flex-col justify-between content-center">
                      <h2 className="text-md text-gray-700 font-semibold leading-4 h-8 text-shadow">
                        {" "}
                        {item.name}{" "}
                      </h2>
                    </div>
                  </Link>
                  <p className="flex justify-center text-purple-600 text-sm">
                    ★★★★★
                  </p>
                  <p className="flex justify-center text-gray-700 font-racing font-medium text-shadow text-2xl leading-6 py-1">
                    £{item.price}
                  </p>
                  <button
                    onClick={() => handleClick(item)}
                    className="leading-none font-semibold text-md mt-1 mb-1 mx-2 bg-purple-600 button-beep text-white py-2 rounded-full shadow"
                  >
                    Add to basket
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
