import React,{useState,useEffect,useContext} from "react"
import { getAllCategories } from "../api/Category";



import {UserContext} from "../context/UserContext"
import CategoryModal from "./Modal/CategoryModal";



const Category=()=>{

    const context=useContext(UserContext);  

    const [categories,setCategories]=useState([]);

    const [show,setShow]=useState(false)

    useEffect(()=>{
        getAllCategories().then(res=>{
            console.log(res);
            setCategories(res.data);
            context.notify("categories loaded successfully", "success");
        })
        .catch(err=>{
            console.log(err);
            context.notify("could not load categories","danger");
        })
    },[])


    return (
      <div>
        {context.user ? (
          <div>
            <div className="container-fluid mt-4 row ">
              <div className="col-sm-12 d-flex justify-content-center">
                <h3 className="headText">Your Category List</h3>
              </div>
            </div>
            <div className="container ml-auto mr-auto row bg-gray container mt-4">
              <div className="col-sm-2 mt-1">
              </div>
              <div className="col-sm-2">
                
              </div>
              <div className="col-sm-1">
                
              </div>
              <div className="offset-sm-5 col-sm-2 d-flex justify-content-end">
                <button
                  onClick={()=>setShow(true)}
                  className="btn mt-1 mb-1 btn-md border border-rounded btn-success btn-outline"
                >
                  Add Category
                </button>

                <CategoryModal show={show} setShow={setShow} />
              </div>

              
            </div>
            <div className="container bg-gray  table-responsive">
              <table class="table  table-dark table-hover ">
                <thead>
                  <tr>
                    <th scope="col">categoryId</th>
                    <th scope="col">Name</th>
                    <th scope="col">Total Money</th>
                    <th scope="col">created At</th>
                  </tr>
                </thead>
                <tbody>
                    {categories.map(cat=>{
                        return (
                          <tr>
                            <th scope="row">{cat._id}</th>
                            <td>{cat.name}</td>
                            <td>amount</td>
                            <td>date</td>
                          </tr>
                        );
                    })}
                      
                    
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h1>please login first</h1>
        )}
      </div>
    );
}


export default Category;