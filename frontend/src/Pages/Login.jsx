import React, { useState } from "react";
import axios, { Axios } from "axios"
import { message } from "antd";
import { useNavigate } from "react-router-dom";
let Login = () => {
  let [values, setValues] = useState({
     username:'',
     password:''
  })

let handleInput = (event) =>{
  event.preventDefault()
  let newObj = {...values,[event.target.name] : event.target.value}
  setValues(newObj)
}


let navigate = useNavigate()
axios.defaults.withCredentials = true
let handleSubmit=(e)=>{
  e.preventDefault()
   axios.post('http://localhost:8080/react/login',values)
   .then(res=>{
    if(res.data.Status === 'success'){
      setTimeout(()=>{
        message.success('Login Successfully')
        navigate('/')
      })
    }else{
      setTimeout(()=>{
        message.error(res.data.Message)
      })
    }
   })
   .catch(err=>console.log(err))
   
}


  return (
    <div className="py-5">
      <div className="container mt-5" style={{ width: "32%" }}>
        <div className="row">
          <div className="card shadow">
            <div className="card-header bg-white">
              <h1 className="fw-bold text-center text-success">Login</h1>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="pt-2">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" id="username" placeholder="Username"
                onChange={handleInput} required />
              </div>
              <div className="pt-2">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control mb-2" name="password" id="password" placeholder="Password"
                 onChange={handleInput} required />
              </div>
              <p className="mb-1">You are agree to our terms and policies</p>
            </div>
            <div className="card-footer">
               <button type="submit" className="btn btn-success w-100">Login</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;