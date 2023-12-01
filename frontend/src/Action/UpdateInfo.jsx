import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams , Link} from "react-router-dom";
import { message } from "antd";


let UpdateInfo = () => {

  let [values, setValues] = useState({
    id:'',
    Username: '',
    firstName: '',
    lastName: '',
    contact_number: ''
  })


  let { id } = useParams();
  useEffect(() => {
    axios.get('http://localhost:8080/react/upadateInfo/' + id)
      .then(res => {
        if (res.data.Status === 'Success') {
          setValues({
            ...values,
            id : res.data.result[0].id,
            Username: res.data.result[0].username,
            firstName: res.data.result[0].Fname,
            lastName: res.data.result[0].Lname,
            contact_number: res.data.result[0].number,
          })
        }
      })
      .catch(err => console.log(err))
  }, [])

  let navigate = useNavigate();
 let handleSubmit = (e) =>{
  e.preventDefault()
  axios.post('http://localhost:8080/react/updateData', values)
  .then(res=>{
    if(res.data.Status === 'success'){
      setTimeout(()=>{
        message.success(res.data.Message);
        navigate('/setting')
      })
    }
  })
  .catch(err=>console.log(err))
 }

  return (
    <div className="px-4 py-5">
      <div className="container w-75">
        <div className="row">
          <div className="card shadow">
            <div className="card-header">
              <h5 className="fw-bold mt-2">Update Information
                <Link to="/setting" className="btn btn-danger float-end">Back</Link>
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="pt-2">
                  <input type="hidden" name="id" id="id" onChange={e =>setValues({...values, id: e.target.value})}
                  value={values.id} />
                  <label htmlFor="username" className="fw-bold mb-1">Username</label>
                  <input type="text" name="email" id="email" className="form-control"
                    onChange={e => setValues({ ...values, Username: e.target.value })} value={values.Username} />
                </div>
                <div className="pt-2">
                  <label htmlFor="firstName" className="fw-bold mb-1">First Name</label>
                  <input type="text" name="firstName" id="firstName" className="form-control"
                    onChange={e => setValues({ ...values, firstName: e.target.value })} value={values.firstName} />
                </div>
                <div className="pt-2">
                  <label htmlFor="lastName" className="fw-bold mb-1">Last Name</label>
                  <input type="text" name="lastName" id="lastName" className="form-control"
                    onChange={e => setValues({ ...values, lastName: e.target.value })} value={values.lastName} />
                </div>
                <div className="pt-2">
                  <label htmlFor="contact_number" className="fw-bold mb-1">Contact Number</label>
                  <input type="text" name="contact_number" id="contact_number" className="form-control"
                    onChange={e => setValues({ ...values, contact_number: e.target.value })} value={values.contact_number} />
                </div>

                <button className="btn btn-primary float-end mt-5">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateInfo;