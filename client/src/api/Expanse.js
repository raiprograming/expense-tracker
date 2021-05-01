import axios from "axios";


const url = "http://localhost:5000/api";

export const getAllExpanses=()=>{
    const body=JSON.stringify({
        "id":localStorage.getItem("id")
    });
    return axios.post(`${url}/expanse/get`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
}

export const createExpanse=(data)=>{
  let body=JSON.stringify(data);
  return axios.post(`${url}/expanse/create`,body,{
    headers:{
      "Content-Type":"application/json",
    },
  })
}