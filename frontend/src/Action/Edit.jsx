import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import {message} from "antd"
let Edit = () => {
  let [data, setData] = useState({
    id:'',
    email: '',
    first_name: '',
    last_name: '',
    position:'',
    salary:''
  })

  let { id } = useParams()
  useEffect(() => {
    axios.get('http://localhost:8080/react/getEmp/' + id)
      .then(res => {
        if (res.data.Status === 'success') {
          setData({
            ...data,
            id:res.data.result[0].id,
            email: res.data.result[0].email,
            first_name: res.data.result[0].first_name,
            last_name: res.data.result[0].last_name,
            position: res.data.result[0].position,
            salary: res.data.result[0].salary,
          })
        }
      })
      .catch(err => console.log(err))
  },[])
  
  let navigate = useNavigate()
  let handleUpdate = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:8080/react/UpdateEmp', data)
    .then(res => {
      if(res.data.Status === 'success'){
       setTimeout(()=>{
        message.success(res.data.Message)
        navigate('/employee')
       })
      }
    })
    .catch(err => console.log(err))
   
  }


  return (
    <div className="container w-75">
      <div className="row">
        <div className="card shadow">
          <div className="card-header bg-white">
            <Link to="/employee" className="float-end btn btn-danger mt-1">Back</Link>
            <h4 className="fw-bold pt-2">Update Employee</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="card-body">
                <div className="pt-2">
                  <input type="hidden" onChange={e =>setData({...data, id: e.target.value})} name="id" value={data.id} />
                  <label htmlFor="email">Email</label>
                  <input type="text" className="form-control" placeholder="Enter Email"
                    onChange={e => setData({ ...data, email: e.target.value })} name="email" id="email"
                    value={data.email}  />
                </div>
                <div className="pt-2">
                  <label htmlFor="first_name">First Name</label>
                  <input type="text" className="form-control" placeholder="Enter First name"
                    onChange={e => setData({ ...data, first_name: e.target.value })} name="first_name" id="first_name"
                    value={data.first_name}  />
                </div>
                <div className="pt-2">
                  <label htmlFor="last_name">Last Name</label>
                  <input type="text" className="form-control" placeholder="Enter Last Name"
                    onChange={e => setData({ ...data, last_name: e.target.value })} name="last_name" id="last_name"
                    value={data.last_name}  />
                </div>
                <div className="pt-2">
                  <label htmlFor="salary">Employee Salary</label>
                  <input type="text" className="form-control" placeholder="Enter Last Name"
                    onChange={e => setData({ ...data, salary: e.target.value })} name="salary" id="salary"
                    value={data.salary}  />
                </div>
                <div className="pt-2">
                  <label htmlFor="position">Employee Position</label>
                  <input type="text" className="form-control" placeholder="Enter Employee position"
                    onChange={e => setData({ ...data, position: e.target.value })} name="position" id="position"
                    value={data.position}  />
                </div>
                <button type="submit" className="btn btn-success float-end mt-2 mb-2">Update Employee</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit;