import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";
import imageAPI from '../../services/imageApi';

const Profile = () => {
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const profile = useSelector((state) => state.profileReducer);

  if (!userInfo || !userInfo.name) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <h1>User Profile</h1>

      <section className="user-info">
        <h2>User Info</h2>
        <p>
          <strong>Name:</strong> {userInfo.name}
        </p>
        <p>
          <strong>Surname:</strong> {userInfo.surname}
        </p>
        <p>
          <strong>Date of Birth:</strong> {userInfo.dateOfBirth}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>

        <h2>Profile</h2>
        <p>
          <strong>Description:</strong> {userInfo.verification.description}
        </p>
        <p>
          <strong>Interests:</strong> {userInfo.verification.interests}
        </p>
        <p>
        <strong>Profile Image:</strong>
          <img
            src={
              userInfo.verification.image
                ? imageAPI.getImage(userInfo.verification.image) 
                : "/default-profile.jpg"
            }
            alt="Profile"
            style={{ width: "100px", height: "100px" }}
          />
        </p>
      </section>
    </div>
  );
};

export default Profile;
