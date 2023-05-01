import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader'
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import axios from 'axios';

function Dashboard() {
    useEffect(() => {
        document.getElementById('page-loader').style.display = 'none';
        var element = document.getElementById("page-container");
        element.classList.add("show");
    }, []);
    return (
        <>
            <Loader />
            <div id="page-container" className="fade page-sidebar-fixed page-header-fixed">
                <Menu />
                <div id="content" className="content">
                    <ol className="breadcrumb float-xl-right">
                        <li className="breadcrumb-item"><a>Home</a></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                    <h1 className="page-header">Dashboard </h1>
                    <div className="row">
                        <div className="col-xl-3 col-md-6">
                            <div className="widget widget-stats bg-info">
                                <div className="stats-icon"><i className="fa fa-users"></i></div>
                                <div className="stats-info">
                                    <h4>Total Users</h4>
                                    <p>122</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="/users">View Detail <i className="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6">
                            <div className="widget widget-stats bg-purple">
                                <div className="stats-icon"> <i class="fa fa-book"></i></div>
                                <div className="stats-info">
                                    <h4>Total Courses</h4>
                                    <p>10</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="/courses">View Detail <i className="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6">
                            <div className="widget widget-stats bg-info">
                                <div className="stats-icon"> <i class="fa fa-calendar"></i></div>
                                <div className="stats-info">
                                    <h4>Total Events</h4>
                                    <p>18</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="/courses">View Detail <i className="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6">
                            <div className="widget widget-stats bg-purple">
                                <div className="stats-icon"> <i class="fa fa-address-card"></i></div>
                                <div className="stats-info">
                                    <h4>Total Posts</h4>
                                    <p>20</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="/courses">View Detail <i className="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Dashboard
