import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';

// import SweetAlert from 'react-bootstrap-sweetalert';
// import axios from 'axios';
// import { ALMA_PLUS_API_URL } from './baseURL';

const Users = () => {

    // let navigate = useNavigate();
    const [users] = useState([]);
    const [displayUsers, setDisplayUsers] = useState([]);
    const rows = [10, 20, 30];
    const [usersPerPage, setUsersPerPage] = useState(rows[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');

    useEffect(() => {
        document.getElementById('page-loader').style.display = 'none';
        var element = document.getElementById("page-container");
        element.classList.add("show");
        // getUsersData('none','none');
    }, []);

    // const getUsersData = (startDate, endDate) => {
    //     var bodyFormData = new URLSearchParams();
    //     bodyFormData.append('auth_code', "PlUsOnE$123");
    //     const myurl = `${ALMA_PLUS_API_URL}api/admin/get-users`;
    //     axios({
    //         method: "post",
    //         url: myurl,
    //         data: bodyFormData,
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //     }).then((response) => {
    //         console.log(response.data.data);
    //         if (response.data.success === true) {
    //             let res = response.data.data;
    //             let arr = [];
    //             console.log(from);
    //             console.log(to);
    //             if(startDate==='none'&&endDate==='none'){
    //             res.map((elem) => {
    //                 arr.push({ ...elem, full_name: elem.first_name + ' ' + elem.last_name, phone_number: elem.country_code + elem.mobile })
    //             })
    //             }else{
    //                 res.map((elem) => {
    //                     if(elem.createdAt>=from && elem.createdAt<=to){
    //                     arr.push({ ...elem, full_name: elem.first_name + ' ' + elem.last_name, phone_number: elem.country_code + elem.mobile })
    //                     }
    //                 })
    //             }
    //             setUsers(arr);
    //         }
    //     });
    // };

    useEffect(() => {
        // setDisplayUsers(users);
    }, [users]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = displayUsers.slice(indexOfFirstUser, indexOfLastUser);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(displayUsers.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (num) => {
        setCurrentPage(num);
    }

    const handleSearch = (e) => {
        if (e.target.value) {
            let search = e.target.value;
            setDisplayUsers(users.filter(
                (elem) =>
                    elem.full_name.toLowerCase().includes(search.toLowerCase()) ||
                    elem.email.toLowerCase().includes(search.toLowerCase()) 
            ));
        } else {
            setDisplayUsers(users)
        }
    }

    const handleApply = ()=>{
        if(from && to){
        // getUsersData(from,to);
        setCurrentPage(1);
        }
    }

    const handleReset= ()=>{
        // getUsersData('none','none');
        setCurrentPage(1);
        setFrom('');
        setTo('');
    }

    return (
        <Fragment>
            <Loader />
            <div id="page-container" className="fade page-sidebar-fixed page-header-fixed">
                <Menu />
                <div id="content" className="content">
                    <ol className="breadcrumb float-xl-right">
                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Users</li>
                    </ol>
                    <h1 className="page-header">Users
                        {/* <Link to="/add-user" className="btn btn-success" ><i className="fa fa-plus"></i></Link> */}
                    </h1>
                    <div className='row date-filter d-flex align-items-center justify-content-sm-end m-r-10 m-b-10'>
                        <label>From:</label>
                        <input type="date" value={from} onChange={(e)=>{setFrom(e.target.value)}} className='form-control col-md-3 ml-2 mr-4'/>
                        <label>To:</label>
                        <input type="date" value={to} onChange={(e)=>{setTo(e.target.value)}} className='form-control col-md-3 ml-2' />
                        <button className='btn btn-success ml-2' onClick={handleApply}>Apply</button>
                        <button className='btn btn-danger ml-2' onClick={handleReset}>Reset / Clear</button>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div class="form-outline mb-4">
                                <input type="search" class="form-control" id="datatable-search-input" placeholder='Search User' onChange={handleSearch} />
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="product-listing" className="table">
                                            <thead>
                                                <tr>
                                                    <th>Sr. No.</th>
                                                    <th>Full Name</th>
                                                    <th>Profile Pic</th>
                                                    <th>Email</th>
                                                    <th>Phone Number</th>
                                                    <th>Birth Date</th>
                                                    <th>User Type</th>
                                                    <th>Role</th>
                                                    {/* <th>Action</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentUsers.length > 0 ? currentUsers.map((elem, index) =>
                                                    <tr key={index}>
                                                        <td align='left'>{index + 1}</td>
                                                        <td>{elem.full_name}</td>
                                                        <td><img src={elem.profile_pic} alt='user-img' style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} /></td>
                                                        <td>{elem.email}</td>
                                                        <td>{elem.phone_number ? elem.phone_number : ''}</td>
                                                        <td>{elem.birth_date}</td>
                                                        <td>{elem.type === 1 ? 'Regular' : elem.type === 2 ? 'Google' : 'Facebook'}</td>
                                                        <td>{elem.is_switch_to_contractor?'Both':'Only User'}</td>
                                                        {/* <td><i className='fa fa-edit' style={{ color: "green", cursor: "pointer" }} onClick={() => history.push({ pathname: '/edit-collection', state: elem })} ></i><i className='fa fa-trash' onClick={() => handleDeleteCollection(elem.id)} style={{ marginLeft: "12px", color: "red", cursor: "pointer" }}></i></td> */}
                                                    </tr>
                                                ) : <tr><td >No Record Found..</td></tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="gt-pagination" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <ul class="pagination">
                                            {pageNumbers.map((number) =>
                                                <li class={currentPage === number ? "page-item active" : "page-item"} aria-current="page">
                                                    <span class="page-link" onClick={() => paginate(number)}>{number}</span>
                                                </li>
                                            )}
                                        </ul>
                                        <div className='filter-pages' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <label htmlFor='selection' style={{ marginBottom: '0' }}>Users Per Page :</label>
                                            <select className='selection' style={{ outline: '0', borderWidth: '0 0 1px', borderColor: 'black', marginLeft: '10px' }} onChange={(e) => setUsersPerPage(e.target.value)}>
                                                {rows.map(value =>
                                                    <option value={value}>{value}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {alert === true ? <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    title="Are you sure?"
                    onConfirm={DeleteUser}
                    onCancel={() => { setAlert(false); setDeleteId(''); }}
                >
                    You will not be able to recover this user!
                </SweetAlert> : ''
                }
                {alert2 === true ? <SweetAlert
                    success
                    title="User Deleted Successfully!"
                    onConfirm={() => { setAlert2(false); getUserData(); }}
                />
                    : ''} */}
                <Footer />
            </div>
        </Fragment>
    )
}

export default Users
