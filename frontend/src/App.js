import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//Components
import NavBar from "./components/Navbar";
import SideBar from "./components/SideBar";


//Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Employee from "./Pages/Employee";
import Setting from "./Pages/Setting";
import EmpDetails from "./Pages/EmpDetails";
//Action
import Create from "./Action/Create";
import Edit from "./Action/Edit";
import UpdateInfo from "./Action/UpdateInfo";
import UpdatePass from "./Action/UpdatePass";


let Layout = () =>{
  return(
   <div className="sb-nav-fixed">
     <NavBar />
     <SideBar />
   </div>
  )
}

let router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/employee",
        element:<Employee />
      },
      {
        path:"/setting",
        element:<Setting/>
      },
      //Action route
      {
        path:"/create",
        element:<Create/>
      },
      {
        path:"/edit/:id",
        element:<Edit/>
      },
      {
        path:"/admin_info/:id",
        element:<UpdateInfo />
      },
      {
        path:"/admin_pass/:id",
        element:<UpdatePass />
      },
      {
        path:"/empDetails/:id",
        element:<EmpDetails/>
      }
      
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  
  
])


let App = () =>{
  return(
   
      <RouterProvider router={router}></RouterProvider>
    
   
  )
}
export default App;
