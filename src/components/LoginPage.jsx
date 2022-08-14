import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useValidatableForm } from "react-validatable-form";
import FormErrorComponent from "./FormErrorComponent";
import { connect } from "react-redux";
import { postLogin } from "./../store/actions";

const initialFormData = {
  val_email: "",
};

const rules = [
  {
    path: "val_email",
    ruleSet: [{ rule: "required" }, { rule: "email" }],
  },
  {
    path: "val_password",
    ruleSet: [{ rule: "required" }],
  },
];

const Login = (props) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const {
    isValid,
    setPathValue,
    getValue,
    getError,
    setFormIsSubmitted,
  } = useValidatableForm({
    rules,
    initialFormData,
  });

  const handleSubmit = async (e) => {
    const submitResultValid = setFormIsSubmitted();
    if (submitResultValid) {
      e.preventDefault();
      const response = await props.postLogin({
        email: username,
        password: password,
      });
      localStorage.setItem("accessToken", response.payload.user.token);
      localStorage.setItem("user", JSON.stringify(response.payload.user));
      window.location.href = "/";
    }
  };

  return (
    <div className="container" style={{ marginTop: "1.5rem" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign In</h1>
          <p className="text-xs-center">
            <Link to="/register" style={{ color: "#5CB85C" }}>
              Need an account?
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  id="val_email"
                  value={getValue("val_email") || ""}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setPathValue("val_email", e.target.value);
                  }}
                />
                <FormErrorComponent errorMessage={getError("val_email")} />
              </fieldset>

              <fieldset className="form-group">
                <input
                  id="val_password"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={getValue("val_password")}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPathValue("val_password", e.target.value);
                  }}
                />
                <FormErrorComponent errorMessage={getError("val_password")} />
              </fieldset>
              <p style={{ color: "red" }}>
                {" "}
                Form is {""} {isValid ? "valid" : "invalid"}
              </p>
              <button
                className="btn btn-lg btn-success pull-xs-right"
                type="submit"
              >
                Sign in
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { postLogin })(Login);
