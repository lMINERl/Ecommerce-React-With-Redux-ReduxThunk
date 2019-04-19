import React, { Component } from 'react';
import './App.css';
import ProductListing from './containers/ProductListing';
import Footer from './components/Footer';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Form from './containers/Form';
import Details from './containers/Details';
// import Edit from './components/edit';
import Login from './components/Login/Login';
import Register from './components/Register';


class App extends Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <>
            <Switch>
              {/* <Route path="/edit/:id" exact component={Edit} /> */}
              <Route path="/add" exact component={Form} />
              <Route path="/products/:id" component={Details} />
              <Route path="/users/login" exact component={Login} />
              <Route path="/users/register" exact component={Register} />
              <Route path="/products" exact component={ProductListing} />
              <Redirect from="/home" to="/users/register" />
              <Redirect from="/" to="/users/register" />
              <Route render={() => { return "not found!!!" }} />
            </Switch>
            <Footer />
          </>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
