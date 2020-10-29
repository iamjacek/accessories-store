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


const Root = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route component={App} exact path="/" />
      <Route component={Signin} path="/signin" />
      <Route component={Signup} path="/signup" />
      <Route component={Checkout} path="/checkout" />
    </Switch>
    <Footer />
  </Router>
)


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
