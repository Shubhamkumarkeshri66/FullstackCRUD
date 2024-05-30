import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./postUser.css";
import { useNavigate } from "react-router-dom";

const PostUser = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    published: "",
  });
  const navigate= useNavigate();
  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/addbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); // Ensure this line is after checking if the response is ok
        console.log(data);
        navigate("/");

        alert("Book registered successfully!");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error in registering. Please try again.");
    }
  };

  return (
    <div className="center-form">
      <h1>Post New Book</h1>
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
          ADD BOOK
        </Button>
      </Form>
    </div>
  );
};

export default PostUser;
