// src/api.js
const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to add user");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const editUser = async (user) => {
  try {
    const response = await fetch(`${API_URL}/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to update user");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
  } catch (error) {
    throw error;
  }
};
