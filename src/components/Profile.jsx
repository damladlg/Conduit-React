import React, { useEffect, useState } from "react";
import "./../assets/css/profile.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserProfile } from "./../store/actions";
import ArticleTabs from "./Article/ArticleTabs";

const Profile = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [image, setImage] = useState();
  const [bio, setBio] = useState();
  const [username, setUserName] = useState(user.username);

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const data = await props.getUserProfile(username);
    if (data) {
      setImage(data.payload.profile.image);
      setBio(data.payload.profile.bio);
      setUserName(data.payload.profile.username);
    }
  };
  return (
    <>
      {" "}
      <div className=" container-profile">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                {image ? (
                  <img src={image} className="user-img" alt={username} />
                ) : (
                  <img
                    src="https://api.realworld.io/images/smiley-cyrus.jpeg"
                    className="user-img"
                    alt={username}
                  />
                )}
                <h4>{username}</h4>
                <p>{bio}</p>
                <div>
                  <Link
                    to="/settings"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit profil settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container profile-wrap">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle" style={{ marginTop: "20px" }}>
              <ArticleTabs
                header1={"My Articles"}
                header2={"Favorited Articles"}
                username={username}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { getUserProfile })(Profile);
