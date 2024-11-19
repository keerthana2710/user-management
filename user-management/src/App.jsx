// src/App.js
import React, { useState, useEffect } from "react";
import { fetchUsers, addUser, editUser, deleteUser } from "./components/api";
import UserTable from "./components/usertable";
import UserForm from "./components/UserForm";
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users");
      }
    };

    loadUsers();
  }, []);

  const handleAddUser = async (user) => {
    try {
      const newUser = await addUser(user);
      setUsers((prev) => [...prev, newUser]);
    } catch (err) {
      setError("Failed to add user");
    }
  };

  const handleEditUser = async (user) => {
    try {
      const updatedUser = await editUser(user);
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setSelectedUser(null); // Close the form after saving
    } catch (err) {
      setError("Failed to update user");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  // This function will reset the form and clear selectedUser state
  const handleCancelEdit = () => {
    setSelectedUser(null); // Reset the selectedUser to null to close the form
  };

  return (
    <div className="app-container">
      <h1 className="app-title">User Management</h1>
      {error && <div className="error">{error}</div>}
      <div className="form-container">
        <UserForm
          user={selectedUser}
          onSave={selectedUser ? handleEditUser : handleAddUser}
          onCancel={handleCancelEdit} // Pass the handleCancelEdit function here
        />
      </div>
      <div className="user-table-container">
        <UserTable
          users={users}
          onEdit={setSelectedUser}
          onDelete={handleDeleteUser}
        />
      </div>
      
    </div>
  );
};

export default App;

