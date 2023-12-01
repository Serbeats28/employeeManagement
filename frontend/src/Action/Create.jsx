import React, { useState } from "react";
import axios from "axios";
import {message} from "antd"
import {useNavigate, Link} from "react-router-dom"




let Create = () =>{

  let [values, setValues] = useState({
    email:'',
    first_name:'',
    last_name:'',
    position:'',
    salary:'',
    avatar:'',
  })

let handleInput =(event) =>{
    let newObj = {...values,[event.target.name] : event.target.value}
    setValues(newObj)
}
let navigate = useNavigate()
let handleSubmit = (e) =>{
  e.preventDefault()
  let formData= new FormData()
  formData.append("email", values.email)
  formData.append("first_name", values.first_name)
  formData.append("last_name", values.last_name)
  formData.append("position", values.position)
  formData.append("salary", values.salary)
  formData.append("avatar", values.avatar)
  axios.post('http://localhost:8080/react/store', formData)
  .then(res => {
    if(res.data.Status === 'success'){
      setTimeout(() =>{
        message.success(res.data.Message)
        navigate('/employee')
     },2000)

    }else{
      setTimeout(() =>{
        message.warning(res.data.Message)
      })
    }
  })
  .catch(err=>console.log(err))
 
}


  return(
    <div className="container w-75">
        <div className="row">
            <div className="card shadow">
                <div className="card-header bg-white">
                    <Link to="/employee" className="float-end btn btn-danger mt-2">Back</Link>
                    <h4 className="fw-bold pt-2">Add Employee</h4>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="pt-2">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" placeholder="Enter Email" 
                       onChange={handleInput}  name="email" id="email" />
                    </div>
                    <div className="pt-2">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" placeholder="Enter First name" 
                        onChange={handleInput}  name="first_name" id="first_name" />
                    </div>
                    <div className="pt-2">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" placeholder="Enter Last Name" 
                        onChange={handleInput}  name="last_name" id="last_name" />
                    </div>
                    <div className="pt-2">
                        <label htmlFor="position">Employee Position</label>
                        <input type="text" className="form-control" placeholder="Enter Employee position" 
                       onChange={handleInput}   name="position" id="position" required />
                    </div>
                    <div className="pt-2">
                        <label htmlFor="salary">Employee Salary</label>
                        <input type="text" className="form-control" placeholder="Enter Employee salary" 
                       onChange={handleInput} name="salary" id="salary" required />
                    </div>
                    <div className="pt-2 mb-2">
                        <label htmlFor="avatar">Image Avatar</label>
                        <input type="file" className="form-control" name="avatar"
                       onChange={e =>setValues({...values, avatar: e.target.files[0]})} 
                       id="avatar" required />
                    </div>
                    <button type="submit" className="btn btn-success float-end mt-2 mb-2">Add Employee</button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create;