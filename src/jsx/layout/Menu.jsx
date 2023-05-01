import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { ALMA_PLUS_API_URL } from '../pages/baseURL';

function Menu() {
   const navigate = useNavigate();
   // if (localStorage.getItem("AlmaPlus_admin_Id") == null) {
   //    toast.error("Please login first...!");
   //    navigate(`/`);
   // }

   const Logout = () => {
      localStorage.removeItem('AlmaPlus_Admin_Id');
      navigate(`/`);
   }

   const [admin, setAdmin] = useState({
      image: '',
      name: ''
   })

   var dashboardClass = window.location.pathname.match(/^\/dashboard/) ? "active" : "";
   var usersClass = window.location.pathname.match(/^\/users/) ? "active" : "";
   var coursesClass = window.location.pathname.match(/^\/courses/) ? "active" : "";
   var eventsClass = window.location.pathname.match(/^\/events/) ? "active" : "";
   var postsClass = window.location.pathname.match(/^\/posts/) ? "active" : "";

   const getData = () => {
      var bodyFormData = new URLSearchParams();
      bodyFormData.append('auth_code', "AlmaPlus");
      bodyFormData.append('id', localStorage.getItem("AlmaPlus_admin_Id"));
      const myurl = `${ALMA_PLUS_API_URL}api/admins/get-profile`;
      axios({
         method: "post",
         url: myurl,
         data: bodyFormData,
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }).then((response) => {

         if (response.data.success === true) {
            setAdmin({
               name: response.data.data.name,
               // image: response.data.data.image
            })
         }
      }).catch((error) => {
         console.log(error.response.data.message);
      });
   };

   // useEffect(() => getData(), [])

   return (
      <>
         <div id="header" className="header navbar-default">
            <div className="navbar-header">
               <Link to="/dashboard" className="navbar-brand">
                  {/* <span className="navbar-logo"/> */}
                  <img src='Logo.jpg' style={{ marginRight: '5px' }} alt="logo" />
                  <b>AlmaPlus</b></Link>
            </div>
            <ul className="navbar-nav navbar-right">
               <li className="dropdown navbar-user">
                  <a className="dropdown-toggle" data-toggle="dropdown">
                     <img src="/assets/img/login-bg/login-bg-1-thumb.jpg" alt="" />
                     <span className="d-none d-md-inline">User</span> <b className="caret"></b>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                     <Link to="/profile" className="dropdown-item">Edit Profile</Link>
                     <a onClick={Logout} className="dropdown-item">Log Out</a>
                  </div>
               </li>
            </ul>
         </div>
         <div id="sidebar" className="sidebar">
            <div data-scrollbar="true" data-height="100%">
               <ul className="nav">
                  <li className={dashboardClass}>
                     <Link to="/dashboard" >
                        <i className="fa fa-th-large"></i>
                        <span>Dashboard</span>
                     </Link>
                  </li>
                  <li className={usersClass}>
                     <Link to="/users" >
                        <i class="fa fa-users"></i>
                        <span>Users</span>
                     </Link>
                  </li>
                  <li className={coursesClass}>
                     <Link to="/courses" >
                        <i class="fa fa-book"></i>
                        <span>Courses</span>
                     </Link>
                  </li>
                  <li className={eventsClass}>
                     <Link to="/events" >
                        <i class="fa fa-calendar"></i>
                        <span>Events</span>
                     </Link>
                  </li>
                  <li className={postsClass}>
                     <Link to="/posts" >
                        <i class="fa fa-address-card"></i>
                        <span>Post</span>
                     </Link>
                  </li>
               </ul>
            </div>
         </div>

         <div className="sidebar-bg"></div>

      </>
   )
}

export default Menu
