import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/getallbook");
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Data is not an array");
      }
    } catch (error) {
      console.error("Error during fetching data:", error.message);
    }
  };
  useEffect(() => {
   fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/deletebook/${userId}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      if(response.ok)
        {
          fetchUsers();
        }
    } catch (error) {
      console.error("Error during Deleting data:", error.message);
    }
  };
  const handleUpdate = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard Component</h1>
      {users.length > 0 ? (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Published</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.title}</td>
                <td>{user.author}</td>
                <td>{user.genre}</td>
                <td>{user.published}</td>
                <td>
                  <Button variant="dark" onClick={() => handleUpdate(user._id)}>
                    Update
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Dashboard;
