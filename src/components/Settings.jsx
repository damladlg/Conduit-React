import React, { useState, useEffect } from "react";
import "./../assets/css/profile.css";

import { connect } from "react-redux";
import { userUpdateSettings, getUser } from "./../store/actions";

const Settings = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.stringify(localStorage.getItem("accessToken"));

  const [image, setImage] = useState(user.image);
  const [bio, setBio] = useState(user.bio);
  const [username, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const data = await props.getUser();
    if (data) {
      setImage(data.payload.user.image);
      setBio(data.payload.user.bio);
      setUserName(data.payload.user.username);
      setEmail(data.payload.user.email);
      setPassword(data.payload.user.password);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const a = JSON.stringify(
      props.userUpdateSettings(username, email, password, bio, image)
    );
    console.log(a);
  };

  return (
    <div className="container" style={{ marginTop: "1.5rem" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h3 className="text-xs-center">Your Settings</h3>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </fieldset>

              <fieldset className="form-group">
                <input
                  className="form-control form-control-m"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </fieldset>

              <fieldset className="form-group">
                <textarea
                  className="form-control form-control-m"
                  rows="8"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </fieldset>

              <fieldset className="form-group">
                <input
                  className="form-control form-control-m"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>

              <fieldset className="form-group">
                <input
                  className="form-control form-control-m"
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
              <div className="btn-settings">
                <button
                  className="btn btn-lg btn-success pull-xs-right"
                  type="submit"
                >
                  Update Settings
                </button>
              </div>
            </fieldset>
          </form>
          <hr />

          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Or click here to logout.
          </button>
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

export default connect(mapStateToProps, { userUpdateSettings, getUser })(
  Settings
);
