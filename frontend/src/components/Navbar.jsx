import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
let NavBar = () =>{
    let navigate = useNavigate()
   let handleLogout = () =>{
     axios.get('http://localhost:8080/react/logout')
     .then(res =>{
        if(res.data.Status === 'success'){
            navigate('/login')
        }
     })
   }
  return(
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <Link className="navbar-brand ps-3" to="#">React App</Link>
    <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
            <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
            <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="bi bi-search"></i></button>
        </div>
    </form>
   
    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person "></i></Link>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="#!">Settings</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li onClick={handleLogout}><Link className="dropdown-item" to="#!">Logout</Link></li>
            </ul>
        </li>
    </ul>
</nav>
  )
}

export default NavBar;