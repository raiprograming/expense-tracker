import axios from "axios"

const url="http://localhost:5000/api";


export const signup=(email,password)=>{
    const body=JSON.stringify({
        "email":email,
        "password":password
    });
    return axios.post(`${url}/user/signup`,body,{
        headers:{
            'Content-Type':'application/json'
        }
    })
    
}

export const signin=(email,password)=>{
    const body = JSON.stringify({
      email: email,
      password: password,
    });
    return axios.post(`${url}/user/signin`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
}