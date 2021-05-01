import React,{useState,useEffect,useContext} from "react";
import { UserContext } from "../../context/UserContext";

import "./CategoryModal.css"



const CategoryModal=({show,setShow})=>{

    const context=useContext(UserContext);


    const onSubmit=()=>{
        context.notify("category added successfully","success")
        setShow(false);
    }


    return show ? (
      <div className="Modal">
        <div className="container ml-1">
          <span className="text-success" style={{ fontSize: "35px" }}>
            Add Category Here
          </span>
        </div>
        <div className="container mt-4">
          <div className="row mt-4">
            <div className="offset-sm-3 col-sm-6 mt-4 ">
              <label style={{ fontWeight: "600" }} className="text-success">
                Category Name
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="enter category name"
              />
              <br></br>
              <label style={{ fontWeight: "600" }} className="text-success">
                Description
              </label>
              <textarea
                className="form-control"
                cols="45"
                rows="4"
                placeholder="enter description"
              ></textarea>
              <div className="text-center">
                <button
                onClick={()=>onSubmit()}
                className="text-center btn btn-md border border-rounded btn-success mt-2">
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
}

export default CategoryModal;