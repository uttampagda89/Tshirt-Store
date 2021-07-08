import React, {useState} from "react";
import Base from "../core/Base";
import {signup} from "../auth/helper";
import {Link} from "react-router-dom";

const Signup = () => {
        const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
      });

      const { name, email, password, error, success } = values;              // Destructuring variable so we can call them by without need of values.name

      const handleChange = (name) =>                                                     //S13V2 Higher order function who take care of setting up values
        (event) => {
          setValues({ ...values, error: false, [name]: event.target.value });
        };


      const onSubmit = (event) => {                                 //Handle submit button S13V3
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
          .then((data) => {
            console.log("DATA", data);                             // if we sucess to sign up then it gives data which come from backend
            if (data.email === email) {                            // if backend email and form email is same thent it means signup sucess
              setValues({
                ...values,
                name: "",
                email: "",
                password: "",
                error: "",
                success: true,
              });
            } else {
              setValues({
                ...values,
                error: true,
                success: false,
              });
            }
          })
          .catch((e) => console.log(e));
      };

      const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                New account created successfully. Please <Link
                  to="/signin"
                >
                  login now.
                </Link>
              </div>
            </div>
          </div>
        );
      };

      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                Check all fields again
              </div>
            </div>
          </div>
        );
      };

      const signUpForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-light">Name</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={handleChange("name")}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">Email</label>
                  <input
                    className="form-control"
                    value={email}
                    onChange={handleChange("email")}
                    type="email"
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">Password</label>
                  <input
                    className="form-control"
                    value={password}
                    onChange={handleChange("password")}
                    type="password"
                  />
                </div>
                <button
                    onClick={onSubmit}
                  className="btn btn-success btn-block"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      };


    return(
        <Base title={'Sign Up'} description={'A sign up page for User'}>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">
              {JSON.stringify(values)}
            </p>
        </Base>
    )
}

export default Signup;
