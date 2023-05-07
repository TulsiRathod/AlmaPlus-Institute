import React, { useState, useEffect, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { ALMA_PLUS_API_URL } from './baseURL';
import axios from 'axios';

import Loader from '../layout/Loader'
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';

const AddCourse = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.getElementById('page-loader').style.display = 'none';

        var element = document.getElementById("page-container");
        element.classList.add("show");

    }, []);
    const [errors, setErrors] = useState({});
    const [disable, setDisable] = useState(false);

    const [data, setData] = useState({
        name: "",
        stream: "",
        duration: ""

    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setData({
            name: "",
            stream: "",
            duration: ""
        });
    }

    const submitHandler = (e) => {
        // e.preventDefault();
        if (validate()) {
            setDisable(true)
            axios({
                method: "post",
                url: `${ALMA_PLUS_API_URL}api/addCourse`,
                data: {
                    name: data.name,
                    stream: data.stream,
                    duration: data.duration
                },
            }).then((response) => {
                // console.log(response.data.data);
                handleReset();
                setDisable(false);
                toast.success("Course Added");
                setTimeout(() => {
                    navigate('/courses');
                }, 1500);
            }).catch((error) => {
                console.log(error);
                setDisable(false);
            });

        }
    };

    const validate = () => {
        let input = data;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name_err"] = "Please Enter Course Name";
        }
        if (!input["stream"]) {
            isValid = false;
            errors["email_err"] = "Please Enter Course Stream";
        }
        if (!input["duration"]) {
            isValid = false;
            errors["number_err"] = "Please Enter Course Duration";
        }
        setErrors(errors);
        return isValid;
    }

    return (
        <Fragment>
            <ToastContainer />
            <Loader />
            <div id="page-container" className="fade page-sidebar-fixed page-header-fixed">
                <Menu />
                <div id="content" className="content">
                    <ol className="breadcrumb float-xl-right">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to="/courses">Courses</Link></li>
                        <li className="breadcrumb-item active">Add Course</li>
                    </ol>
                    <h1 className="page-header">Add Course  </h1>

                    <div className="row">
                        <div className="col-xl-6 ui-sortable">
                            <div className="panel panel-inverse" data-sortable-id="form-stuff-10">
                                <div className="panel-heading ui-sortable-handle">
                                    <h4 className="panel-title">Add Course</h4>
                                    <Link to="/courses" className="btn btn-sm btn-default pull-right">Back</Link>
                                </div>


                                <div className="panel-body">
                                    <form>
                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label htmlFor="exampleInputName">Course Name:</label>
                                                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Course Name" name="name" value={data.name} onChange={handleChange} />
                                                    <div className="text-danger">{errors.name_err}</div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label htmlFor="courseStream">Course Stream:</label>
                                                    <input className="form-control" id="courseStream" placeholder="Enter Course Stream" name="stream" value={data.stream} onChange={handleChange} />
                                                    <div className="text-danger">{errors.email_err}</div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label htmlFor="exampleInputAddress">Course Duration:</label>
                                                    <input type='number' className="form-control" id="exampleInputNumber" placeholder="Enter Course Duration" name="duration" value={data.duration} onChange={handleChange} />
                                                    <div className="text-danger">{errors.number_err}</div>
                                                </div>
                                            </div>

                                            <button type="button" className="btn btn-sm btn-success m-r-5" onClick={submitHandler}>{disable ? 'Processing...' : 'Submit'}</button>
                                            <button type="reset" className="btn btn-sm btn-default" onClick={handleReset}>Reset</button>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </Fragment>
    )
}

export default AddCourse;
