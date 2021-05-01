import React from "react"
import {useState,useEffect, useContext} from "react"
import "./Modal.css"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {createExpanse} from "../../api/Expanse"
import { getAllCategories } from "../../api/Category";
import { UserContext } from "../../context/UserContext";



const Modal=({show,setShow,setReset,reset})=>{

    const context=useContext(UserContext);

    const [loading,setLoading]=useState(false);

    const [startDate, setStartDate] = useState(new Date());

    const [categories,setCategories]=useState([]);

    const [data,setData]=useState([
        {
            category:"",
            amount:"",
            cause:"",
            categoryName:""
        }
    ]);


    const addRow=()=>{
        let updatedData=[...data,{
          category: "",
          amount: "",
          cause: "",
          categoryName:""
        }];
        setData(updatedData);
        
    }

    const deleteRow=(ind)=>{
        let updatedData=data.filter((value,index)=>{
            return index!=ind;
        })
        setData(updatedData);
    }

    const sendData=()=>{
      setLoading(true);
      console.log(data);
      let selectedDate=startDate.toISOString().slice(0,10);
      let body={
        "date":selectedDate,
        "expanse":{
          "date":selectedDate,
          "u_id":localStorage.getItem("id"),
          "expanses":data
        }
      }
      createExpanse(body)
      .then(res=>{
        console.log(res);
        setLoading(false);
        setShow(false);

        context.notify("data stored successfully","success");
        setReset(!reset)
        
      })
      .catch(err=>{
        console.log(err)
        setLoading(false);
        setShow(false);
        context.notify("something went wrong","error")
      })

    }

    const setCategory=(e,ind)=>{
      console.log("setCategory called with value",e.target.value);
      let data1=data;
      data1[ind].category=e.target.value;
      let elem=categories.find((val,index)=>{
        return val._id==e.target.value
      });
      console.log(elem);
      data1[ind].categoryName=elem.name;
      setData(data1);

    }


    useEffect(()=>{
      setCategories([{
        _id:"1",
        name:"cat1"
      },{
        _id:2,
        name:"cat2"
      }])
      getAllCategories()
      .then(res=>{
        console.log(res)
        setCategories(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    },[])

    
    return show ? (
      <div className="Modal">
        <div className="modalContent ml-3 mr-3 mt-3 mb-3">
          <span style={{ fontSize: 40 }} className="text-lg text-success">
            Add Expanse
          </span>
          <div className="modalBody ml-4 mr-4 mt-4">
            <div className="row ml-4 mr-4">
              <div className="col-sm-12">
                <span style={{ fontSize: 20 }} className="text-primary">
                  Choose A Date
                </span>

                <DatePicker
                  className="ml-4 text-color"
                  style={{}}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div className="row ml-4 mr-4 mt-3">
              <div className="col-sm-12 d-flex justify-content-center">
                <div className="container bg-white  table-responsive">
                  <table class="table table-bordered table-hover ">
                    <thead>
                      <tr>
                        <th scope="col" width="30%" className="text-center">
                          Category
                        </th>
                        <th scope="col" width="20%" className="text-center">
                          Amount
                        </th>
                        <th scope="col" width="40%" className="text-center">
                          Description
                        </th>
                        <th scope="col" width="10%" className="text-center">
                          <span
                            style={{ color: "grey" }}
                            className="material-icons"
                            onClick={() => addRow()}
                          >
                            add
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => {
                        return (
                          <tr>
                            <td className="text-center" width="20%">
                              <select
                                onChange={(e) => setCategory(e, index)}
                                
                                style={{ height: 30, width: 100 }}
                              >
                                <option selected>select category</option>
                                {categories.map((value, index) => {
                                  return (
                                    <option value={value._id}>
                                      {value.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </td>
                            <td className="text-center" width="20%">
                              <input
                                onChange={(e) =>
                                  (data[index].amount = e.target.value)
                                }
                                style={{ height: 40 }}
                                className=""
                                placeholder="enter amount"
                              ></input>
                            </td>
                            <td className="text-center" width="50%">
                              <textarea
                                onChange={(e) => {
                                  data[index].cause = e.target.value;
                                }}
                                cols="50"
                                placeholder="enter description"
                              />
                            </td>
                            <td className="text-center" width="10%">
                              <span
                                onClick={() => deleteRow(index)}
                                style={{ color: "grey" }}
                                className="material-icons"
                              >
                                delete
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="modalFooter ml-4 mr-4">
            <div className="row ml-4 mr-4 mt-2">
              <div className="col-sm-3">
                <button
                  onClick={() => setShow(false)}
                  className="btn btn-primary btn-md"
                >
                  Close
                </button>
              </div>
              <div className="offset-sm-6 col-sm-3 ">
                {loading?
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
              :<button
                  onClick={() => sendData()}
                  className="btn btn-success btn-md"
                >
                  submit
                </button>
              }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
}


export default Modal;