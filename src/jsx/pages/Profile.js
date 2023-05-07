import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ALMA_PLUS_API_URL } from './baseURL';
import Loader from '../layout/Loader';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';

const Profile = () => {
    const ADMIN_ID = "64571e8764d8c6b82e7bcaf3";
    // const [changepass, setChangePass] = useState({
    //     old_password: '',
    //     new_password: '',
    //     confirm_password: ''
    // });
    const [profileInfo, setProfileInfo] = useState({
        _id: '',
        name: '',
        email: '',
        phone: '',
        profilepic: ''
    });
    const [errors, setErrors] = useState({});
    const [disable, setDisable] = useState(false);
    const [disable2, setDisable2] = useState(false);

    const getData = () => {
        const myurl = `${ALMA_PLUS_API_URL}api/getAdminById/${ADMIN_ID}`;
        axios({
            method: "get",
            url: myurl,
        }).then((response) => {
            console.log(response.data.data[0].email);
            if (response.data.success === true) {
                setProfileInfo({
                    name: response.data.data[0].name,
                    email: response.data.data[0].email,
                    phone: response.data.data[0].phone,
                    profilepic: response.data.data[0].profilepic
                })
            }
        });
    };

    useEffect(() => getData(), [])

    const handleImg = (e) => {
        var body = new FormData();
        body.append('profilepic', e.target.files[0]);
        const myurl = `${ALMA_PLUS_API_URL}api/uploadAdminImage`;
        axios({
            method: "post",
            url: myurl,
            data: body,
            headers: { 'Content-Type': "multipart/form-data" },
        }).then((response) => {
            if (response.data.success === true) {
                setProfileInfo({
                    ...profileInfo,
                    profilepic: response.data.data.url
                })
            }
        });
    };

    // const handleChange = (e) => {
    //     const newPass = { ...changepass };
    //     newPass[e.target.name] = e.target.value;
    //     setChangePass(newPass);
    // }

    const handleProfileReset = () => {
        getData();
    }

    // const handlePassReset = () => {
    //     setChangePass({
    //         old_password: '',
    //         new_password: '',
    //         confirm_password: ''
    //     })
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(profileInfo.phone);
        if (validate()) {
            setDisable(true);
            var body = new FormData();
            body.append('id', `${ADMIN_ID}`);
            body.append('email', profileInfo.email);
            body.append('name', profileInfo.name);
            body.append('phone', profileInfo.phone);
            body.append('profilepic', profileInfo.profilepic);
            axios({
                method: "post",
                url: `${ALMA_PLUS_API_URL}api/adminUpdate`,
                data: body,
            }).then((response) => {
                console.log(response);
                // if (response.data.success === true) {
                //     toast.success('Profile Updated Successfully')
                //     // localStorage.setItem('AlmaPlus_Admin_Email', profileInfo.email);
                //     window.location.reload();
                //     setDisable(false);
                //     setErrors({});
                // } else {
                //     setDisable(false);
                //     toast.error('Something went wrong')
                // }
            }).catch((error) => {
                console.log("Errors", error);
                setDisable(false);
            })
        }
    }

    // const submitHandlerTwo = (e) => {
    //     e.preventDefault();
    //     if (validateTwo()) {
    //         setDisable2(true);
    //         var bodyFormData = new URLSearchParams();
    //         bodyFormData.append('auth_code', "AlmaPlus");
    //         bodyFormData.append('id', localStorage.getItem('AlmaPlus_admin_Id'));
    //         bodyFormData.append('old_password', changepass.old_password);
    //         bodyFormData.append('new_password', changepass.new_password);
    //         const myurl = `${ALMA_PLUS_API_URL}api/admins/change-password`;
    //         axios({
    //             method: "post",
    //             url: myurl,
    //             data: bodyFormData,
    //             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //         }).then((response) => {
    //             console.log(response);
    //             if (response.data.success === true) {
    //                 toast.success('Password Updated Successfully')
    //                 localStorage.setItem('AlmaPlus_Admin_Password', changepass.new_password);
    //                 setDisable2(false);
    //                 // setChangePass({
    //                 //     old_password: '',
    //                 //     new_password: '',
    //                 //     confirm_password: ''
    //                 // });
    //                 setErrors({});
    //             } else {
    //                 setDisable2(false);
    //                 toast.error('Something went wrong')
    //                 setErrors({ ...errors, confirm_password: response.data.message })
    //             }
    //         }).catch((error) => {
    //             console.log("Errors", error);
    //             setDisable2(false);
    //         })
    //     }
    // }

    const validate = () => {
        let input = profileInfo;
        let errors = {};
        let isValid = true;
        if (!input["name"]) {
            isValid = false;
            errors["name_err"] = "Please Enter Name";
        }
        if (!input["email"]) {
            isValid = false;
            errors["email_err"] = "Please Enter Email";
        }
        setErrors(errors);
        return isValid;
    };

    // const validateTwo = () => {
    //     let input = changepass;
    //     let errors = {};
    //     let isValid = true;
    //     if (!input["old_password"]) {
    //         isValid = false;
    //         errors["old_password_err"] = "Please Enter Old Password";
    //     }
    //     if (!input["new_password"]) {
    //         isValid = false;
    //         errors["new_password_err"] = "Please Enter New Password";
    //     }
    //     if (!input["confirm_password"]) {
    //         isValid = false;
    //         errors["confirm_password_err"] = "Please Enter Confirm Password";
    //     }
    //     if (input["new_password"] !== input["confirm_password"]) {
    //         isValid = false;
    //         errors["confirm_password_err"] = "Password Doesn't Match";
    //     }
    //     if (input["new_password"] === input["old_password"]) {
    //         isValid = false;
    //         errors["new_password_err"] = "New Password should be different from old one";
    //     }
    //     setErrors(errors);
    //     return isValid;
    // };


    useEffect(() => {
        document.getElementById('page-loader').style.display = 'none';
        var element = document.getElementById("page-container");
        element.classList.add("show");
    }, []);

    return (
        <>
            <ToastContainer />
            <Loader />
            <div id="page-container" className="fade page-sidebar-fixed page-header-fixed">
                <Menu />
                <div id="content" className="content">
                    <ol className="breadcrumb float-xl-right">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Profile</li>
                    </ol>
                    <h1 className="page-header">Profile</h1>
                    <div className="row">
                        <div className="col-xl-6 ui-sortable">
                            <div className="panel panel-inverse" data-sortable-id="form-stuff-10">
                                <div className="panel-heading ui-sortable-handle">
                                    <h4 className="panel-title">Profile setting</h4>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={(e) => submitHandler(e)} >
                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label for="exampleInputName">Name:</label>
                                                    <input type="text" className="form-control" id="exampleInputName" placeholder="Enter name here.." name="name" value={profileInfo.name} onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })} />
                                                    <div className="text-danger">{errors.name_err}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label for="exampleInputName">Email:</label>
                                                    <input type="text" className="form-control" id="exampleInputEmail" placeholder="Enter name here.." name="name" value={profileInfo.email} onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })} />
                                                    <div className="text-danger">{errors.email_err}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label for="exampleInputImage">Image:</label>
                                                    <br />
                                                    <input type="file" className="form-control" id="exampleInputImage" onChange={handleImg} />
                                                    {profileInfo.profilepic !== '' ?
                                                        <img src={profileInfo.profilepic} className="form-img__img-preview" style={{ width: "84px", height: "84px" }} alt='profile_img' />
                                                        : ''
                                                    }
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-sm btn-success m-r-5" disabled={disable}>{disable ? 'Processing...' : 'Submit'}</button>
                                            <button type="reset" className="btn btn-sm btn-default" onClick={handleProfileReset}>Reset</button>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-xl-6 ui-sortable">
                            <div className="panel panel-inverse" data-sortable-id="form-stuff-10">
                                <div className="panel-heading ui-sortable-handle">
                                    <h4 className="panel-title">Change Password</h4>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={(e) => submitHandlerTwo(e)} >
                                        <fieldset>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label for="exampleInputOldPass">Old Password:</label>
                                                    <input type="password" className="form-control" id="exampleInputOldPass" placeholder="Enter old password here.." name="old_password" onChange={handleChange} value={changepass.old_password} />
                                                    <div className="text-danger">{errors.old_password_err}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label for="exampleInputNewPass">New Password:</label>
                                                    <input type="password" className="form-control" id="exampleInputNewPass" placeholder="Enter new password here.." name="new_password" onChange={handleChange} value={changepass.new_password} />
                                                    <div className="text-danger">{errors.new_password_err}</div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 form-group">
                                                    <label for="exampleInputConfirmPass">Confirm Password:</label>
                                                    <input type="password" className="form-control" id="exampleInputConfirmPass" placeholder="Enter confirm password here.." name="confirm_password" onChange={handleChange} value={changepass.confirm_password} />
                                                    <div className="text-danger">{errors.confirm_password_err}</div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-sm btn-success m-r-5" disabled={disable2}>{disable2 ? 'Processing...' : 'Submit'}</button>
                                            <button type="reset" className="btn btn-sm btn-default" onClick={handlePassReset}>Reset</button>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Profile
