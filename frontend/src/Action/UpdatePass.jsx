import React, { useEffect, useState } from "react";
import Validation from "./Validation";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {message} from "antd";

let UpdatePass = () => {

    let [data, setData] = useState({
        admin_id: '',
        oldPass: '',
        newPass: '',
        conPass: ''
    })
    let [visible, setVisable] = useState(false)

    let { id } = useParams()
    useEffect(() => {
        axios.get('http://localhost:8080/react/getID/' + id)
            .then(res => {
                setData({ ...data, admin_id: res.data.id })
            })
    }, [])

    let [errors, setErrors] = useState("");
    let navigate = useNavigate()
    let handleSubmit = (event) => {
        event.preventDefault()
        setErrors(Validation(data))
        axios.post('http://localhost:8080/react/updatePass/', data)
            .then(res =>{
                if(res.data.Status === 'success'){
                    setErrors(res.data.Message)
                }
                if(res.data.Status1 === 'success1'){
                    setTimeout(()=>{
                      message.success(res.data.Message1)
                      navigate('/setting')
                    })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="px-4 py-5">
            <div className="container w-75">
                <div className="row">
                    <div className="card shadow">
                        <div className="card-header bg-white">
                            <h3 className="fw-bold mt-2">Update Password
                                <button className="btn btn-danger float-end">Back</button></h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="text-center">
                                    {errors.require && <span className="text-danger text-center fw-bold">{errors.require}</span>}
                                    {errors.notMatch && <span className="text-danger text-center fw-bold">{errors.notMatch}</span>}
                                    <span className="fw-bold text-danger">
                                        {errors && errors}
                                    </span>
                                </div>
                                <div className="pt-2">
                                    <input type="hidden" name="admin_id" id="admin_id"
                                        onChange={e => setData({ ...data, admin_id: e.target.value })} value={data.admin_id} />
                                    <label htmlFor="oldPass" className="fw-bold mb-2">Old Password</label>
                                    <input type={visible ? "text" : "password"} className="form-control" name="oldPass" id="oldPass"
                                        onChange={e => setData({ ...data, oldPass: e.target.value })} placeholder="Old Password" />
                                </div>
                                <div className="pt-2">
                                    <label htmlFor="newPass" className="fw-bold mb-2">New Password</label>
                                    <input type={visible ? "text" : "password"} className="form-control" name="newPass" id="newPass"
                                        onChange={e => setData({ ...data, newPass: e.target.value })} placeholder="New Password" />
                                </div>
                                <div className="pt-2">
                                    <label htmlFor="conPass" className="fw-bold mb-2">Confirm Password</label>
                                    <input type={visible ? "text" : "password"} className="form-control" name="conPass" id="conPass"
                                        onChange={e => setData({ ...data, conPass: e.target.value })} placeholder="Confirm Password" />
                                </div>
                                <div className="mt-2">
                                    <input type="checkbox" onClick={() => setVisable(!visible)} /> <span>Show Password</span>
                                </div>

                                <button className="btn btn-primary float-end mt-5">Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePass;