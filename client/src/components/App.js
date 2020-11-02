import React from "react";

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

function App() {
  const apiUrl = process.env.API_URL || 'http://localhost:1337'
 
  const {loading, error, data } = useQuery(CATS)

  //get data into state if u need later
  // const [categories, setCategories] = useState()
  // useEffect(() => {
  //   if(loading === false && data){
  //     setCategories(data);
  //   }
  // }, [loading, data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
 
  

  return (
    // Container
    <main className="container mx-auto px-4 sm:px-8 flex-grow max-w-full">
      {/* Categories */}
      <div className="flex flex-col justify-center mb-4 text-center">
        {/* Header */}
        <h1 className="text-4xl my-6 font-bold text-gray-700">CATEGORIES</h1>
        <div className="flex flex-wrap justify-center mb-6 mx-auto" style={{maxWidth: "1920px"}}>
          {data.cats.map((cat) => (
            <div className="max-w-sm rounded overflow-hidden shadow-lg my-8 mx-3 text-left" key={cat._id}>
              <img className="w-full h-56 object-cover" src={`${apiUrl}${cat.image.url}`} alt={cat.image.name} />
              <div className="px-6 py-5">
                <h2 className="text-2xl text-gray-900 font-bold mb-2 pb-1"> {cat.name} </h2>
                <p className="text-gray-700 leading-7"> {cat.description} </p>
              </div>
              {/* <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
              </div> */}
              
            </div>
          ))}
        </div>
      
      </div>
    </main>
)}

export default App;