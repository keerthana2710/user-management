// src/UserForm.js
import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);  // If editing, populate form fields with user data
    } else {
      // Reset the form if no user is selected (i.e., when adding a new user or canceling)
      setFormData({
        id: "",
        name: "",
        username: "",
        email: "",
        website: "",
      });
    }
  }, [user]); // Dependency array includes `user` to trigger reset when `user` changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Call the onSave function passed from the parent
  };

  return (
    <div className="user-form-card">
      <form onSubmit={handleSubmit}>
        <h2>{user ? "Edit User" : "Add New User"}</h2>
        <div className="input-group">
          <label>First Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Save
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
