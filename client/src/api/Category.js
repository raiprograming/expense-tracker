import axios from "axios";

const url = "http://localhost:5000/api";


export const getAllCategories=()=>{
    const data=JSON.stringify({
        u_id:localStorage.getItem("id")
    })
    return axios.post(`${url}/category/read`, data, {
      headers: {
        "Content-Type": "application/json"
      },
    });
}