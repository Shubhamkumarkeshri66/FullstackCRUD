import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
const UpdateUser = () => {
  const { id } = useParams();
  const navigate =useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    published: "",
  });

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://crudbackend-1xyc.onrender.com/api/v1/getonebook/${id}`);
        const data = await response.json();
        setFormData(data);
        console.log(data);
      } catch (error) {
        console.error("error while fetching users:", error.message);
      }
    };
    fetchUser();
  }, [id]);


  const submitHandler= async(e)=>{
           e.preventDefault();
           try {
            const response = await axios.put(`https://crudbackend-1xyc.onrender.com/api/v1/updatebook/${id}`, formData);
            console.log("Book updated:", response.data);
              navigate("/")
            // Handle success, e.g., display a message, redirect, etc.
          } catch (err) {
            console.error("Error updating book:", err);
            
          }
  }

  return (
    <div className="center-form">
      <h1>Update Book</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group controlId="formBasicAuthor">
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={formData.author}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group controlId="formBasicGenre">
          <Form.Label>Genre:</Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={formData.genre}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPublished">
          <Form.Label>Published:</Form.Label>
          <Form.Control
            type="text"
            name="published"
            value={formData.published}
            onChange={changeHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
