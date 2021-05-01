import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

import Header from "./components/Header"
import { UserContext } from './context/UserContext';
import React,{ useState ,useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route , Link, Switch} from "react-router-dom"
import Home from './components/Home';
import Signin from "./components/Signin"
import Signout from "./components/Signout"
import Signup from "./components/Signup"
import Tracker from './components/Tracker';
import Category from './components/Category';





function App() {

  const [user,setUser]=useState(null)

  const [name,setName]=useState("");

  const [loading,setLoading]=useState(false);

  const override = css`
    display: block;
    margin: auto;
    border-color: red;
  `;

  const notify=(text,type)=>{
    toast(text,{type:`${type}`});
  }

  useEffect(()=>{
    if(window!==undefined){
      let id=localStorage.getItem("id");
      if(id==null){
        setUser(false)
      }
      else{
        setUser(true)
        setName(localStorage.getItem("email"));
      }
    }
  },[])


  return (
    <div>
      <Router>
        <UserContext.Provider
          value={{ user, setUser, name, setName, loading, setLoading, notify }}
        >
          <Header />
          <CircleLoader
            color="green"
            loading={loading}
            css={override}
            size={80}
          />
          {loading?<h5 className="text-success d-flex justify-content-center">loading ...</h5>:""}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/tracker" component={Tracker} />
            <Route exact path="/category" component={Category} />
          </Switch>
        </UserContext.Provider>
      </Router>
      <ToastContainer
      position="bottom-center"
      />
    </div>
  );
}

export default App;
