import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");

    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          Email: email,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const user = await response.json();

      setUserDetails({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || email || "",
      });

      setUpdatedDetails({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || email || "",
      });
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = {
        ...updatedDetails,
      };

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      sessionStorage.setItem("email", updatedDetails.email);

      setUserDetails(updatedDetails);
      setEditMode(false);

      alert("Profile Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  return (
    <div className="profile-container">
      {editMode ? (
        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <h1>Edit Profile</h1>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={updatedDetails.email}
              disabled
            />
          </label>

          <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
              required
            />
          </label>

          <button type="submit" className="save-profile-btn">
            Save
          </button>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-icon">
            <i className="fa fa-user"></i>
          </div>

          <h1>Welcome, {userDetails.name}</h1>

          <p>
            <b>Email:</b> {userDetails.email}
          </p>

          <p>
            <b>Phone:</b> {userDetails.phone}
          </p>

          <button
            type="button"
            className="edit-profile-btn"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;