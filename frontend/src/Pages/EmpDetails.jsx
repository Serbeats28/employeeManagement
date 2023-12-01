import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'


let EmpDetails = () => {

    let [info, setInfo] = useState([]);
   let {id} = useParams();
   useEffect(()=>{
      axios.get('http://localhost:8080/react/details/' + id)
      .then(res=>{
        if(res.data.Status === 'success'){
            setInfo(res.data.result);
        }
      })
      .catch(err=>console.log(err))
   },[]);


    return (
        <div className='px-4 py-5'>
            <div className="container w-50">
                <div className="row">
                    <div className="card shadow">
                        <div className="card-body">
                           {
                             info.map((index, i)=>(
                                <div key={i}>
                                <div className='text-center p-2'>
                                    <img src={'http://localhost:8080/images/' + index.avatar} className=' rounded-circle' 
                                    style={{width:"150px", height:"100px"}} alt="avatar" />
                                    <h3 className='p-4 fw-bold'>Employee Details</h3>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="email" className='fw-bold'>Email</label>
                                        <input type="text" className='form-control' id='email' value={index.email} disabled />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="first_name" className='fw-bold'>First name</label>
                                        <input type="text" className='form-control' id='first_name' value={index.first_name} disabled />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="last_name" className='fw-bold'>Last name</label>
                                        <input type="text" className='form-control' id='last_name' value={index.last_name} disabled />
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <label htmlFor="postion" className='fw-bold'>Position</label>
                                        <input type="text" className='form-control' id='postion' value={index.position} disabled />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="salary" className='fw-bold'>Salary</label>
                                    <input type="text" className="form-control" id='position' value={index.salary} disabled />
                                </div>
                                <div className="mt-3">
                                    <Link to={'/edit/' + index.id} className='btn btn-primary float-end m-1'>Update</Link>
                                    <Link to="/" className='btn btn-danger float-end m-1'>Back</Link>
                                </div>
                               </div>
                             ))
                           }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmpDetails;
