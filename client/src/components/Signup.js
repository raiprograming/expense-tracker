import React, { useState , useContext} from "react";


import {Row,Col,FormGroup,Form,Input,Label,InputGroup} from "reactstrap"
import styles from "./Signup.module.css"; 
import {signup} from "../api/User";
import {UserContext} from "../context/UserContext"
import { useHistory } from "react-router";

const Signup = () => {

  const [email,setEmail]=useState("");
  const [mobile,setMobile]=useState("");
  const [password,setPassword]=useState("");
  const context=useContext(UserContext);

  const history=useHistory();

  

  const handleSubmit=(e)=>{
    e.preventDefault()
    //make api call here
    signup(email,password)
    .then(res=>{
      context.notify("signed up successfully","success")
      console.log(res);
      history.push("/signin");
    })
    .catch(err=>{
      context.notify("could not register user")
      console.log(err);
    })
  }


  return (
    <div>
        <div>
          <Row>
            <Col className="col-sm-12 mt-4 d-flex justify-content-center">
              <h1 className={styles.headText}>Sign Up Here</h1>
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
                <Label>Mobile Number</Label>
                <br></br>
                <input
                  onChange={(e) => setMobile(e.target.value)}
                  type="number"
                  className="form-control"
                  placeholder="enter mobile number"
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

export default Signup;
