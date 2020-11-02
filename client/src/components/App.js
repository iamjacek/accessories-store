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
  const apiUrl = process.env.API_URL || 'http://localhost:1337/graphql'
 
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
    <main className="container mx-auto px-4 sm:px-8 flex-grow">
      {/* Categories */}
      <div className="flex flex-col justify-center mb-4">
        {/* Header */}
        <h1 className="text-2xl my-6 font-medium text-gray-700">CATEGORIES</h1>
        {console.log(data)}
        <div className="flex flex-wrap justify-center mb-4 ">
          {data.cats.map((cat) => (
            <div className="max-w-sm rounded overflow-hidden shadow-lg" key={cat._id}>
              <img className="w-full" src={`${cat.image.url}`} alt={cat.image.name} />
              <h2 className="text-xl text-bold mb-4"> {cat.name} </h2>
              <p> {cat.description} </p>
            </div>
          ))}
        </div>
      
      </div>
    </main>
)}

export default App;