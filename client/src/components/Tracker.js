import React, { useContext, useEffect, useState } from "react"
import { getAllExpanses } from "../api/Expanse";
import { UserContext } from "../context/UserContext";
import Modal from "../components/Modal/Modal"
import { getAllCategories } from "../api/Category";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Tracker=()=>{

    const context=useContext(UserContext);

    const [expanses,setExpanses]=useState([]);
    const [filteredExpanses,setFilteredExpanses]=useState([]);
    const [show,setShow]=useState(false);
    const [date,setDate]=useState(new Date())

    const [categories,setCategories]=useState([]);
    const [reset,setReset]=useState(false);

    const [category,setCategory]=useState("select category");


    const filterCategory=(val)=>{
      if(val=='All'){
        setFilteredExpanses(expanses);
        setCategory(val);
        return
      }
      if(val=="select category"){
        setFilteredExpanses(expanses);
        setCategory(val);
        return;
      }
      let arr=expanses.filter((itm,index)=>{
        return itm.category==val;
      })
      setCategory(val);
      setFilteredExpanses(arr);
    }

    const dateFilter=(date)=>{
      console.log(date);
      let arr = expanses.filter((itm, index) => {
        return (
          itm.date ==
          date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear()
        );
      });
      setFilteredExpanses(arr);
      setDate(date);
    }

    useEffect(()=>{
        context.setLoading(true);
        getAllExpanses().
        then(res=>{
            console.log("expanse= ",res.data.data);
            let arr=[];
            res.data.data.forEach((element,index) => {
              let date=new Date(element.date);
              element.date=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
              let array=element.expanses.map((itm)=>{
                itm.date=element.date;
                return itm;
              });
              arr=[...arr,...array]
            });
            setExpanses(arr);
            setFilteredExpanses(arr);

        })
        .catch(err=>{
            console.log(err);
            context.notify("something went wrong...","error");
        })

        getAllCategories()
          .then((res) => {
            console.log(res);
            setCategories(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        context.setLoading(false);
    },[])

    useEffect(()=>{
      getAllExpanses()
        .then((res) => {
          console.log("expanse= ", res.data.data);
          let arr = [];
          res.data.data.forEach((element, index) => {
            let date = new Date(element.date);
            element.date =
              date.getDate() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getFullYear();
            let array = element.expanses.map((itm) => {
              itm.date = element.date;
              return itm;
            });
            arr = [...arr, ...array];
          });
          setExpanses(arr);
          setFilteredExpanses(arr);
        })
        .catch((err) => {
          console.log(err);
          context.notify("something went wrong...", "error");
        });
    },[reset])

    const refresh=()=>{
      setFilteredExpanses(expanses)
      setCategory("All")
    }

    return (
      <div>
        {context.user ? (
          <div>
            <div className="container-fluid mt-4 row ">
              <div className="col-sm-12 d-flex justify-content-center">
                <h3 className="headText">Your Expanse List</h3>
              </div>
            </div>
            <div className="container ml-auto mr-auto row bg-gray container mt-4">
              <div className="col-sm-2 mt-1">
                <DatePicker
                  selected={date}
                  className="text-color"
                  style={{}}
                  onChange={(date) => dateFilter(date)}
                />
              </div>
              <div className="col-sm-2">
                <select
                  style={{ height: "35px" }}
                  className="mt-1 ml-4 border border-success rounded-lg"
                  value={category}
                  onChange={(e)=>filterCategory(e.target.value)}
                >
                  <option value="select category" selected>select category</option>
                  <option value="All">All</option>
                  {categories.map((val, ind) => (
                    <option value={val._id}>{val.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-1">
                <button
                onClick={()=>refresh()}
                className="btn btn-sm border border-rounded mt-1 btn-success">
                  refresh
                </button>
              </div>
              <div className="offset-sm-5 col-sm-2 d-flex justify-content-end">
                <button
                  onClick={() => setShow(true)}
                  className="btn mt-1 mb-1 btn-md border border-rounded btn-success btn-outline"
                >
                  Add Expanse
                </button>
              </div>

              <Modal show={show} setShow={setShow} reset={reset} setReset={setReset}/>
            </div>
            <div className="container bg-gray  table-responsive">
              <table class="table  table-dark table-hover ">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Category</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpanses.map((expanse) => {
                    return (
                      <tr>
                        <th scope="row">{expanse.date}</th>
                        <td>{expanse.categoryName}</td>
                        <td>{expanse.amount}</td>
                        <td>{expanse.cause}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h1>Please login first</h1>
        )}
      </div>
    );
}


export default Tracker;