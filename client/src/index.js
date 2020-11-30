import React, { useState } from "react"
import ReactDOM from "react-dom"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import "./index.css"
import "./tailwind.output.css"
import reportWebVitals from "./reportWebVitals"
import { getToken } from "./utils"

import App from "./components/App"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Checkout from "./components/Checkout"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Items from "./components/Items"
import SingleItem from "./components/SingleItem"
import Basket from "./components/Basket/Basket"

import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from "@apollo/client"

const apiUrl = process.env.API_URL || "http://localhost:1337/graphql"

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
})

const PrivateRoute = ({ component: Component, basketItems, ...rest }) => (
  <Route
    {...rest}
    render={(basketItems, ...props) =>
      getToken() !== null ? (
        <Component {...props} newBasketItems={basketItems} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
          }}
        />
      )
    }
  />
)

let counter = 1
const Root = () => {
  const [isBasketOpen, setIsBasketOpen] = useState(false)
  const sendBasketOpen = () => {
    setIsBasketOpen(!isBasketOpen)
  }

  const [newItem, setnewItem] = useState(0)
  const sendBasketItems = (item) => {
    setnewItem({ item, counter })
    counter++
  }

  const [basketItems, setBasketItems] = useState([])
  const sendAllBasketItems = (items) => {
    setBasketItems(items)
  }

  return (
    <Router>
      <ApolloProvider client={client}>
        <Navbar basketOpenInfo={sendBasketOpen} />
        <Basket
          toAdd={newItem}
          basketOpen={isBasketOpen}
          toggleBasketItself={() => setIsBasketOpen(!isBasketOpen)}
          passAllBasketItems={sendAllBasketItems}
        />
        <Switch>
          <Route component={App} exact path="/" />
          <Route component={Signin} path="/signin" />
          <Route component={Signup} path="/signup" />
          <PrivateRoute
            component={Checkout}
            path="/checkout"
            newBasketItems={basketItems}
          />
          <Route
            path="/product/:id"
            render={(props) => (
              <Items {...props} passNewBasketItems={sendBasketItems} />
            )}
          />
          <Route
            path="/item/:id/:name"
            render={(props) => (
              <SingleItem {...props} passNewBasketItems={sendBasketItems} />
            )}
          />
        </Switch>
        <Footer />
      </ApolloProvider>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
