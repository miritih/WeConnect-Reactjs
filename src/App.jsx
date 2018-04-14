import React from 'react';
// import components
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Auth/Login';
// import PrivateRoute from './Components/Auth/PrivateRoute';
import { ToastContainer } from 'react-toastify';
//import css
import './App.css';

// import react router deps
import { BrowserRouter as Router, Route } from "react-router-dom";


//create a router 
const router = (
  <Router>
  <div>
    <Route exact path='/' component={Home}/>
    <Route exact path='/register' component={Register}/>
    <Route exact path='/login' component={Login}/>
    <ToastContainer />
  </div>
</Router>
);

class App extends React.Component {
  render() {
    return (
      router
    );
  }
}

export default App;
