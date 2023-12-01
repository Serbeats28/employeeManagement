import axios from "axios";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";


let SideBar = () => {

    let navigate = useNavigate()
   let handleLogout = () =>{
     axios.get('http://localhost:8080/react/logout')
     .then(res =>{
        if(res.data.Status === 'success'){
            navigate('/login')
        }
     })
   }


    return (
     <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 ">
                <Link to="#" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">Menu</span>
                </Link>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start " id="menu">
                    <li>
                    <Link to="/"className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                        </Link>
                        
                    </li>
                    <li>
                        <Link to="/employee" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Employees</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/setting" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-gear"></i> <span className="ms-1 d-none d-sm-inline">Setting</span>
                        </Link>
                    </li>
                    <li onClick={handleLogout}>
                        <Link to="#" className="nav-link px-0 align-middle text-white">
                            <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span>
                       </Link>
                    </li>
                </ul>
                
            </div>
        </div>
        <div className="col p-0 m-0">
            <div className='p-2 d-flex justify-content-center'>
                <h4 className='fw-bold fs-3'>Employees Management  System</h4> 
            </div>
            <Outlet/>
        </div>
    </div>
</div>
    )
}

export default SideBar;