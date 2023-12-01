import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

let Home = () =>{
  
    let navigate = useNavigate()
    axios.defaults.withCredentials = true
   useEffect(()=>{
     axios.get('http://localhost:8080/react/home')
     .then(res=>{
        if(res.data.Status === 'success'){

        }else{
            navigate('/login')
        }
     })
   },[])
  
   let [total1, adminTotal] =useState({
       adminTotal:'',
      
   });
   useEffect(()=>{
      axios.get('http://localhost:8080/react/getAdminTotal')
      .then(res=>{
        adminTotal({...total1, adminTotal: res.data.result})
      })
      .catch(err=>console.log(err))
   },[])
  
   let [total2, EmployeeTotal] = useState({
     empTotal:''
   })
   useEffect(()=>{
      axios.get('http://localhost:8080/react/getEmployeeTotal')
      .then(res=>{
         EmployeeTotal({...total2, empTotal:res.data.result})
      })
      .catch(err=>console.log(err))
   },[])

   let [employee, setEmployee] = useState([]);
   useEffect(()=>{
     axios.get('http://localhost:8080/react/data')
     .then(res=>{
        if(res.data.Status === 'success'){
            setEmployee(res.data.result);
        }
     })
     .catch(err=>console.log(err))
   },[]);
 
  return(
    <div>
    <div className="d-flex justify-content-around p-3">
        <div className="px-3 pb-3 pt-2 border shadow-sm w-25">
            <div className="text-center pb-1">
                <h4>Admin</h4>
            </div>
            <hr />
            <div className="">
                <h5 className="fw-bold">Total: {total1.adminTotal}</h5>
            </div>
        </div>

        <div className="px-3 pb-3 pt-2 border shadow-sm w-25">
            <div className="text-center pb-1">
                <h4>Employee</h4>
            </div>
            <hr />
            <div className="">
                <h5 className="fw-bold">Total: {total2.empTotal }</h5>
            </div>
        </div>

        <div className="px-3 pb-3 pt-2 border shadow-sm w-25">
            <div className="text-center pb-1">
                <h4>Salary</h4>
            </div>
            <hr />
            <div className="">
                <h5 className="fw-bold">Total: 15000</h5>
            </div>
        </div>
    </div>
    <div className="pt-3 mt-4 px-5">
        <h3>List of Email of Employee</h3>
        <table className="table table-bordered w-75 shadow">
            <thead className="text-center">
                <tr>
                <th>Email</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    employee.map((index,i )=>(
                        <tr key={i}>
                            <td>{index.email}</td>
                            <td>
                                <Link to={'/empDetails/' + index.id} className="btn btn-secondary">See Details</Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
</div>
  )
}

export default Home;