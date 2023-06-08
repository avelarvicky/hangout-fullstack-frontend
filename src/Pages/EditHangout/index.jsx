import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import hangoutsService from "../../Services/hangout.service";

// steps:
// 1 - grab route params (hangoutId)
// 2 - call axios to get specific info of a hangout
// 3 - create a form
// 4 - handle changes of inputs content
// 5 - handle submit

import React from "react";

function EditHangoutPage() {
  const [title, setTitle] = useState("New Hangout");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [auth, setAuth] = useState("public");

  const { hangoutId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    hangoutsService
      .getHangout(hangoutId)
      .then((response) => {
        const oneHangout = response.data;

        setTitle(oneHangout.title);
        setDescription(oneHangout.description);
        setLocation(oneHangout.location);
        setDate(oneHangout.date);
        setTime(oneHangout.time);
        setImage(oneHangout.image);
        setAuth(oneHangout.auth);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [hangoutId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description,
      location,
      date,
      time,
      image,
      auth,
    };

    hangoutsService
      .updateHangout(hangoutId, requestBody)
      .then(() => {
        navigate(`/hangouts/${hangoutId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Edit the HangOut</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Location:</label>
        <textarea
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Date:</label>
        <textarea
          type="date"
          name="date"
          value={date}
          pattern="\m{2}-\d{2}-\y{4}"
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label htmlFor="image">
          Images:
          <input type="file" onChange={(e) => handleUpload(e)} />
        </label>

        <label>Public</label>
        <input
          type="radio"
          name="auth"
          value="public"
          checked={auth === "public"}
          onChange={(e) => setAuth(e.target.value)}
        />

        <label>Private</label>
        <input
          type="radio"
          name="auth"
          value="private"
          checked={auth === "private"}
          onChange={(e) => setAuth(e.target.value)}
        />

        <button type="submit">Edit HangOut</button>
      </form>
    </div>
  );
}

export default EditHangoutPage;
