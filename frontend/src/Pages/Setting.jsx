import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {message} from "antd"
let Setting = () => {

    let [data, setData] = useState({
        admin_id: '',
        username:'',
        first_name: '',
        last_name: '',
        number: '',
        profile: ''
    })

    let handleSubmit = (e) => {
        e.preventDefault()
        let fd = new FormData()
        fd.append("admin_id", data.admin_id)
        fd.append("profile", data.profile)
        axios.post('http://localhost:8080/react/imageStore', fd)
        .then(res=>{
            if(res.data.Status === 'success'){
                setTimeout(()=>{
                    message.success(res.data.Message)
                    window.location.reload()
                })
            }
        })
        .catch(err=>console.log(err))
    }
    let [adminData, setAdminData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/react/Admin_info')
            .then(res => {
                if (res.data.Status === 'success') {
                    setData({
                        ...data,
                        admin_id: res.data.result[0].id,
                        username: res.data.result[0].username,
                        first_name: res.data.result[0].Fname,
                        last_name: res.data.result[0].Lname,
                        number: res.data.result[0].number,
                        
                    })
                    setAdminData(res.data.result)
                }
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div className="py-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        {
                            adminData.map((info, i)=>(
                                <div key={i}>
                                 <img src={`http://localhost:8080/adminImg/` + info.picture} className="w-75 rounded-circle"
                                style={{ height: "300px", marginLeft: "25px" }} alt="none" />
                                </div>
                            ))
                        }
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="admin_id" id="admin_id"
                                    onChange={e => setData({ ...data, admin_id: e.target.value })} value={data.admin_id} />
                                <input type="file" className="mt-2 form-control" name="profile"
                                    onChange={e => setData({ ...data, profile: e.target.files[0] })} required />
                                <button className="mt-2 btn btn-secondary">Change Profile</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-8 shadow" style={{ width: "65%" }}>
                        <h3 className="fw-bold text-center pt-2">Admin Setting</h3>
                        <hr />
                        <div className="row">
                            <div className="col-12 col-sm-6 mt-2 mb-2">
                                <label htmlFor="first_name" className="fw-bold fs-5">First Name</label>
                                <input type="text" className="form-control " name="first_name" id="first_name"
                                onChange={e => setData({...data, first_name: e.target.value})} value={data.first_name} disabled />
                            </div>
                            <div className="col-12 col-sm-6 mt-2 mb-2">
                                <label htmlFor="last_name" className="fw-bold fs-5">Last Name</label>
                                <input type="text" className="form-control " name="last_name" id="last_name"
                                  onChange={e => setData({...data, last_name: e.target.value})} value={data.last_name} disabled />
                            </div>
                            <div className="col-12 col-sm-6 mt-2 mb-2">
                                <label htmlFor="number" className="fw-bold fs-5">Contact Number</label>
                                <input type="text" className="form-control " name="number" id="number" 
                                 onChange={e => setData({...data, number: e.target.value})} value={data.number} disabled />
                            </div>
                            <div className="col-12 col-sm-6 mt-2 mb-2">
                                <label htmlFor="username" className="fw-bold fs-5">Username</label>
                                <input type="text" className="form-control " name="username" id="username" 
                                 onChange={e => setData({...data, username: e.target.value})} value={data.username} disabled />
                            </div>

                            <div className="col-12 col-sm-6 mt-2 mb-5">
                                <Link to={'/admin_info/' + data.admin_id } className="btn btn-primary">Update Information</Link>
                            </div>
                            <div className="col-12 col-sm-6 mt-2 mb-5">
                                <Link to={'/admin_pass/' + data.admin_id} className="btn btn-primary ">Update Password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}
export default Setting