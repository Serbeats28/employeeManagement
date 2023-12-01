import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import {Button , Modal} from "react-bootstrap"
import {message} from 'antd'

let Employee = () =>{

  let [show, showModal] = useState(false)
   let [dataEmp, setData] = useState({
     userID : ''
   })
    const handleModal = (e) => {
      showModal(true)
      setData({...dataEmp, userID:e.currentTarget.id})
      
    }
    const handleCloseModal = ()=> showModal(false)

   let [userData, setEmpData] = useState([])
   useEffect(()=>{
    axios.get('http://localhost:8080/react/getData')
    .then(res => {
      if(res.data.Status === 'success'){
        setEmpData(res.data.Result)
      }
    })
   },[])
   let handleSubmit = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8080/react/delData', dataEmp)
    .then(res =>{
      if(res.data.Status === 'success'){
        setTimeout(()=>{
          message.success(res.data.Message)
          handleCloseModal()
          window.location.reload()
        })
      }
    })
    .catch(err =>console.log(err))
   }


  return(
    <div className="px-5 py-3">
     <div className="container">
        <Modal show={show}  backdrop="static" keyboard={false} onHide={handleCloseModal}>
           <Modal.Header className="bg-white" closeButton>
               <h4 className="fw-bold pt-2">Delete Employee</h4>
           </Modal.Header>
           <form onSubmit={handleSubmit}>
           <Modal.Body>
              <input type="hidden" name="userID" onChange={e => setData({...dataEmp, userID: e.target.value})}
               value={dataEmp.userID} />
               <h5 className="fw-bold text-danger text-center mb-3">Are you sure want to delete this employee?</h5>
           </Modal.Body>
            <Modal.Footer>
            <Button type="submit" className="btn btn-danger float-end m-2">Yes! Delete it...</Button>
              <Button onClick={handleCloseModal} className="btn btn-secondary float-end">Close</Button>
            </Modal.Footer>
            </form>
        </Modal>
        <div className="row">
          <div className="card">
            <div className="card-header bg-white">
             <Link to="/create" className="btn btn-success float-end mt-1" id="addEmp">Add Employee</Link>
              <h4 className="fw-bold pt-2">Employee List</h4>
            </div>
            <div className="card-body">
               <table className="table table-bordered">
                  <thead>
                      <tr>
                         <th>ID</th>
                         <th>Avatar</th>
                         <th>First Name</th>
                         <th>Last Name</th>
                         <th>Position</th>
                         <th>Salary</th>
                         <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                     userData.map((emp, i) =>(
                       <tr key={i}>
                          <td>{emp.id}</td>
                          <td>
                            <img src={`http://localhost:8080/images/` + emp.avatar} alt="employee_avatar"
                             className="emp_img" style={{width:"100px"}} />
                          </td>
                          <td>{emp.first_name}</td>
                          <td>{emp.last_name}</td>
                          <td>{emp.position}</td>
                          <td>{emp.salary}</td>
                          <td>
                             <Link to={`/edit/` + emp.id } className="btn btn-primary m-2">Edit</Link>
                             <Button onClick={handleModal} id={emp.id} className="btn btn-danger">Delete</Button>
                          </td>
                       </tr>
                     ))
                    }
                  </tbody>
               </table>
            </div>
          </div>
        </div>
     </div>
    </div>
  )
}

export default Employee;