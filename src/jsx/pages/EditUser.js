import React, { useState, useEffect, Fragment } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

import Loader from '../layout/Loader'
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';

const EditUser = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [disable, setDisable] = useState(false);
    // const [states, setStates] = useState([]);
    // const [cities, setCities] = useState([]);
    // const [statess, setStatess] = useState(0);
    // const [citys, setCitys] = useState(0);
    const [data, setData] = useState({
        name: "",
        email: ""
        // country: "",
        // state: "",
        // city: ""
    });
    const location = useLocation();
    const state = location.state;
    console.log("id is:", state);

    const getuserData = () => {
        // firebase.firestore().collection('users').doc(location.state).get().then((doc) => {

        //     setData({
        //         name: doc.data().name,
        //         email: doc.data().Email
        //         // country: doc.data().country,
        //         // state: doc.data().state,
        //         // city: doc.data().city
        //     })
        // })
    }



    useEffect(() => {
        document.getElementById('page-loader').style.display = 'none';

        var element = document.getElementById("page-container");
        element.classList.add("show");

        getuserData();
    }, []);


    const submitHandler = (e) => {
        e.preventDefault();
        if (validate()) {
            setDisable(true);
            const { name, email } = data;
            // firebase.firestore().collection('users').doc(location.state).update({
            //     name,
            //     email
            //     // country,
            //     // state,
            //     // city
            // }).then((docRef) => {
            //     setData({
            //         name: "",
            //         email: ""
            //         // country: "",
            //         // state: "",
            //         // city: "",
            //     });
            //     toast.success("User data is Successfully updated...!");
            //     setTimeout(() => {
            //         navigate('/users')
            //     }, 2000)
            // }).catch((error) => {
            //     setDisable(false)
            //     console.log("Error getting documents: ", error);
            // });
        }
    };

    const validate = () => {
        let input = data;

        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name_err"] = "Please Enter Name";
        }
        if (!input["email"]) {
            isValid = false;
            errors["email_err"] = "Please Enter Email Address";
        }
        // if (!input["country"]) {
        //     isValid = false;
        //     errors["country_err"] = "Please Select Any Country";
        // }
        // if (!input["state"]) {
        //     isValid = false;
        //     errors["state_err"] = "Please Select Any State";
        // }
        // if (!input["city"]) {
        //     isValid = false;
        //     errors["city_err"] = "Please Select Any City";
        // }

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
                        <li className="breadcrumb-item"><Link to="/users">Users</Link></li>
                        <li className="breadcrumb-item active">Edit User</li>
                    </ol>
                    <h1 className="page-header">Edit User  </h1>

                    <div className="row">
                        <div className="col-xl-6 ui-sortable">
                            <div className="panel panel-inverse" data-sortable-id="form-stuff-10">
                                <div className="panel-heading ui-sortable-handle">
                                    <h4 className="panel-title">Edit User</h4>
                                    <Link to="/users" className="btn btn-sm btn-default pull-right">Back</Link>
                                </div>


                                <div className="panel-body">
                                    <form onSubmit={(e) => submitHandler(e)} >
                                        <fieldset>

                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label htmlFor="exampleInputName">Name:</label>
                                                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Name" name="name" onChange={InputEvent} value={data.name} />
                                                    <div className="text-danger">{errors.name_err}</div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label htmlFor="exampleInputAddress">Email:</label>
                                                    <input className="form-control" id="exampleInputEmail" placeholder="Enter Email Address" name="email" onChange={InputEvent} value={data.email} />
                                                    <div className="text-danger">{errors.email_err}</div>
                                                </div>
                                            </div>

                                            {/* <div className="row">
                                                <div className="col-md-4 form-group">
                                                    <label htmlFor="exampleInputCountry">Country:</label>
                                                    <select name="country" className="form-control" onChange={InputEvent} value={data.country}>
                                                        <option value="0">Select Country</option>
                                                        <option value="United States">United States</option>
                                                        <option value="Australia">Australia</option>
                                                        <option value="Germany">Germany</option>
                                                        <option value="India">India</option>
                                                    </select>
                                                    <div className="text-danger">{errors.country_err}</div>
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label htmlFor="exampleInputState">State:</label>
                                                    <select name="state" className="form-control" onChange={InputEvent} value={data.state}>
                                                        <option value="">Select State</option>
                                                        {statess === 0 ?
                                                            <option value={data.state} >{data.state}</option>
                                                            : ''}
                                                        {states.length > 0 ?
                                                            states.map((elem) => {
                                                                return (
                                                                    <Fragment>
                                                                        <option value={elem.name}>{elem.name}</option>
                                                                    </Fragment>
                                                                )
                                                            })
                                                            : ''}
                                                    </select>
                                                    <div className="text-danger">{errors.state_err}</div>
                                                </div>
                                                <div className="col-md-4 form-group">
                                                    <label htmlFor="exampleInputCity">City:</label>
                                                    <select name="city" className="form-control" onChange={InputEvent} value={data.city}>
                                                        <option value="">Select City</option>
                                                        {citys === 0 ?
                                                            <option value={data.city}>{data.city}</option>
                                                            : ''}
                                                        {cities.length > 0 ?
                                                            cities.map((elem) => {
                                                                return (
                                                                    <Fragment>
                                                                        <option value={elem.name}>{elem.name}</option>
                                                                    </Fragment>
                                                                )
                                                            })
                                                            : ''}
                                                    </select>
                                                    <div className="text-danger">{errors.city_err}</div>
                                                </div>
                                            </div> */}
                                            <button type="submit" className="btn btn-sm btn-success m-r-5" disabled={disable} >{disable ? 'Processing...' : 'Update'}</button>
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

export default EditUser;
