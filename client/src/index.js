import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './index.css';
import './tailwind.output.css'
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Items from './components/Items'
import SingleItem from './components/SingleItem'

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

const apiUrl = process.env.API_URL || 'http://localhost:1337/graphql'

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache()
});


const Root = () => (
  <Router>
    <ApolloProvider client={client}>
      <Navbar />
      <Switch>
        <Route component={App} exact path="/" />
        <Route component={Signin} path="/signin" />
        <Route component={Signup} path="/signup" />
        <Route component={Checkout} path="/checkout" />
        <Route component={Items} path="/product/:id" />
        <Route component={SingleItem} path="/item/:id/:name" />
      </Switch>
      <Footer />
    </ApolloProvider>
  </Router>
)


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
