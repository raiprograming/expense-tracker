import React, { useState ,useContext} from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

import {
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Label,
  InputGroup,
} from "reactstrap";
import {signin} from "../api/User"
import styles from "./Signin.module.css"
import {UserContext} from "../context/UserContext"
import { Redirect, useHistory } from "react-router";

const Signin = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")

  const history=useHistory();

  const context=useContext(UserContext);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handleSubmit=(e)=>{
    context.setLoading(true);
    e.preventDefault();
    signin(email,password)
    .then(res=>{
      console.log(res);
      localStorage.setItem("id",res.data.id);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("role",res.data.role)
      localStorage.setItem("email",res.data.email);
      context.setUser(true);
      context.setName(res.data.email);
      
      setTimeout(()=>{
        
      context.setLoading(false);
      context.notify("signed in successfully","success");
      history.push("/");
      return <Redirect to="signup" />
      },1000)
      
    })
    .catch(err=>{
      console.log(err);
      context.setLoading(false)
      context.notify("user not found","error")
    })
  }



  return (
    <div>
      
        <div>
          <Row>
            <Col className="col-sm-12 mt-4 d-flex justify-content-center">
              <h1 className={styles.headText}>Sign In Here</h1>
            </Col>
          </Row>
          <Form className="container formContainer">
            <div className="row ml-4 mt-4 mr-4">
              <div className="col-sm-6 offset-sm-3  ">
                <Label>Email Address</Label>
                <br></br>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="enter email address"
                />
              </div>
            </div>

            <div className="row ml-4 mt-4 mr-4">
              <div className="col-sm-6 offset-sm-3  ">
                <Label>Password</Label>
                <br></br>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="enter password"
                />
              </div>
            </div>

            <div className="row ml-4 mt-4 mr-4">
              <div className="col-sm-6 offset-sm-3 d-flex justify-content-center ">
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="btn btn-outline btn-success btn-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        </div>
    </div>
  );
};

export default Signin;
