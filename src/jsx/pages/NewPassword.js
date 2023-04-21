import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import { PLUS_ONE_API_URL } from "./baseURL";
import axios from "axios";

function NewPassword() {
  const navigate = useNavigate();
  const [changepass, setChangePass] = useState({
    new_password: "",
    confirm_password: "",
  });
  const { id } = useParams();
  console.log(id);

  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(false);

  const validate = () => {
    let input = changepass;
    let errors = {};
    let isValid = true;
    if (!input["new_password"]) {
      isValid = false;
      errors["new_password_err"] = "Please Enter New Password";
    }
    if (!input["confirm_password"]) {
      isValid = false;
      errors["confirm_password_err"] = "Please Enter Confirm Password";
    }
    if (input["new_password"] !== input["confirm_password"]) {
      isValid = false;
      errors["confirm_password_err"] = "Password Doesn't Match";
    }
    setErrors(errors);
    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validate()) {
      setDisable(true);
      var bodyFormData = new URLSearchParams();
      bodyFormData.append('auth_code', "AlmaPlus$123");
      bodyFormData.append('user_id', id);
      bodyFormData.append('new_password', changepass.new_password);
      const myurl = `${PLUS_ONE_API_URL}api/admin/update-password`;
      axios({
          method: "post",
          url: myurl,
          data: bodyFormData,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }).then((response) => {
          if(response.data.success===true){
            setDisable(false);
            toast.success(response.data.message);
            setTimeout(()=>{
                navigate('/');
            },[2000])
          }

      }).catch((error) => {
          console.log("Errors", error);
          setDisable(false);
          toast.error(error.response.data.message);
      })
    }
  };

  const handleChange = (e) => {
    const newPass = { ...changepass };
    newPass[e.target.name] = e.target.value;
    setChangePass(newPass);
  };

  useEffect(() => {
    document.getElementById("page-loader").style.display = "none";
    var element = document.getElementById("page-container");
    element.classList.add("show");
  }, []);

  return (
    <>
      <ToastContainer />
      <div id="page-loader" className="fade show">
        <span className="spinner"></span>
      </div>

      <div className="login-cover">
        <div
          className="login-cover-image"
          style={{
            backgroundImage: "url(assets/img/login-bg/login-bg-17.jpg)",
          }}
          data-id="login-cover-image"
        ></div>
        <div className="login-cover-bg"></div>
      </div>

      <div id="page-container" className="fade">
        <div className="login login-v2">
          <div className="login-header">
            <div className="brand">
              <span className="logo"></span> <b>Plus One</b> Admin
              <small>Forgot Password for Plus One admin panel</small>
            </div>
            <div className="icon">
              <i className="fa fa-lock"></i>
            </div>
          </div>

          <div className="login-content">
            <form>
              <fieldset>
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label for="exampleInputNewPass">New Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputNewPass"
                      placeholder="Enter new password here.."
                      name="new_password"
                      onChange={handleChange}
                      value={changepass.new_password}
                    />
                    <div className="text-danger">{errors.new_password_err}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label for="exampleInputConfirmPass">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputConfirmPass"
                      placeholder="Enter confirm password here.."
                      name="confirm_password"
                      onChange={handleChange}
                      value={changepass.confirm_password}
                    />
                    <div className="text-danger">
                      {errors.confirm_password_err}
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-success btn-block btn-lg"
                  disabled={disable}
                  onClick={submitHandler}
                >
                  {disable ? "Processing..." : "Submit"}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPassword;
