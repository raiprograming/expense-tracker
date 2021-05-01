import React,{useState,useContext} from "react";

import { Link, Redirect, useHistory } from "react-router-dom";
import {
    Navbar,
    Collapse,
    NavbarBrand,
    NavbarText,
    NavbarToggler,
    NavItem,
    NavLink,
    Nav
} from "reactstrap"

import {UserContext} from "../context/UserContext"



const Header=()=>{

    const user=useContext(UserContext);

    let [isOpen,setisOpen]=useState(false);

    const history=useHistory();

    const toogle=()=>{
        setisOpen(!isOpen);
    }

    return (
      <Navbar style={{ background: "#242629" }} expand="md">
        <NavbarBrand style={{ fontSize: "30px", fontStyle: "italic" }}>
          YourBudgetTracker
        </NavbarBrand>
        <Nav className="mr-auto">
          <NavItem>
            <NavLink
              tag={Link}
              to="/"
              className=" btn btn-sm btn-info btn-outline mr-1"
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/tracker"
              className=" btn btn-sm btn-info btn-outline"
            >
              My Tracker
            </NavLink>
          </NavItem>
        </Nav>

        <NavbarToggler onClick={toogle} style={{ background: "blue" }} />
        <Collapse isOpen={isOpen} navbar>
          {user.user ? (
            <Nav className="ml-auto" navbar>
              <NavItem className=" mr-1">
                <NavLink
                  onClick={(e) => {
                    history.push("/category");
                  }}
                  className="btn btn-primary btn-sm btn-outline"
                  style={{ color: "black" }}
                >
                  Categories
                </NavLink>
              </NavItem>
              <NavItem className=" mr-1">
                <NavLink
                  onClick={(e) => {
                    localStorage.clear();
                    user.setUser(false);
                    user.setName("");
                    history.push("/signin");
                  }}
                  className="btn btn-primary btn-sm btn-outline"
                  style={{ color: "black" }}
                >
                  Signout
                </NavLink>
              </NavItem>
              <NavItem className=" mr-1">
                <NavLink
                  className="btn btn-primary btn-sm btn-outline"
                  style={{ color: "black" }}
                >
                  {user.name}
                </NavLink>
              </NavItem>
            </Nav>
          ) : (
            <Nav className="ml-auto" navbar>
              <NavItem className="mr-1">
                <NavLink
                  tag={Link}
                  to="/signup"
                  className="btn btn-primary btn-outline btn-sm"
                  style={{ color: "black" }}
                >
                  Signup
                </NavLink>
              </NavItem>
              <NavItem className=" mr-1">
                <NavLink
                  tag={Link}
                  to="/signin"
                  className="btn btn-primary btn-sm btn-outline "
                  style={{ color: "black" }}
                >
                  Signin
                </NavLink>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    );
}

export default Header;