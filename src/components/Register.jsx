import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postRegister } from "./../store/actions";
import { useValidatableForm } from "react-validatable-form";
import FormErrorComponent from "./FormErrorComponent";

const initialFormData = {
  val_email: "",
};

const customRule = (ruleParams) => {
  const { value } = ruleParams;
  if (value && (value.length < 8 || value.length > 16)) {
    return "this field's length should be greater than 8 and less than 16";
  } else if (value && (value.length < 7 || value.length > 15)) {
    return "this field's length should be greater than 7 and less than 15";
  }
  return null;
};

const rules = [
  {
    path: "val_email",
    ruleSet: [{ rule: "required" }, { rule: "email" }],
  },
  {
    path: "val_username",
    ruleSet: ["required", { rule: customRule }],
  },
  {
    path: "val_password",
    ruleSet: ["required", { rule: customRule }],
  },
];

const Register = (props) => {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {
    isValid,
    setPathValue,
    getValue,
    getError,
    setPathIsBlurred,
    setFormIsSubmitted,
  } = useValidatableForm({
    rules,
    initialFormData,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitResultValid = setFormIsSubmitted();
    if (submitResultValid) {
      const error = props.postRegister(username, email, password);
      console.log(error.payload);
    }
  };

  return (
    <div className="container" style={{ marginTop: "1.5rem" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign Up</h1>
          <p className="text-xs-center">
            <Link to="/login" style={{ color: "#5CB85C" }}>
              Have an account?
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  id="val_username"
                  value={getValue("val_username")}
                  onBlur={() => setPathIsBlurred("val_username")}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setPathValue("val_username", e.target.value);
                  }}
                />
                <FormErrorComponent errorMessage={getError("val_username")} />
              </fieldset>

              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  id="val_email"
                  value={getValue("val_email") || ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setPathValue("val_email", e.target.value);
                  }}
                />
                <FormErrorComponent errorMessage={getError("val_email")} />
              </fieldset>

              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  id="val_password"
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
                Sign up
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

export default connect(mapStateToProps, { postRegister })(Register);
