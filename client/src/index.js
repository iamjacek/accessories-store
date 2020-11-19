import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './index.css';
import './tailwind.output.css'
import reportWebVitals from './reportWebVitals';
import { getToken } from './utils'

import App from './components/App';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Items from './components/Items'
import SingleItem from './components/SingleItem'
import Basket from './components/Basket/Basket'

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const apiUrl = process.env.API_URL || 'http://localhost:1337/graphql'

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache()
});

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {... rest} render={props => (
    getToken() !== null ?
    <Component {...props} /> : <Redirect to={{
      pathname: '/signin',
    }} />
  )}/>
)

let counter = 1
const Root = () => {

  const [newItem, setnewItem] = useState(0)
  const sendBasketItems = (item) => {
    setnewItem({item, counter})
     counter++
  }


 
  return (
    <Router>
      <ApolloProvider client={client}>
        <Navbar />
        <Basket toAdd={newItem} />
        <Switch>
          <Route component={App} exact path="/" />
          <Route component={Signin} path="/signin" />
          <Route component={Signup} path="/signup" />
          <PrivateRoute component={Checkout} path="/checkout" />
          <Route  path="/product/:id"  render={(props) => (
            <Items {...props} passNewBasketItems={sendBasketItems} />
          )} />
          <Route path="/item/:id/:name" render={(props) => (
            <SingleItem {...props} passNewBasketItems={sendBasketItems}/>
          )}/>
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
  document.getElementById('root')
);

reportWebVitals();
