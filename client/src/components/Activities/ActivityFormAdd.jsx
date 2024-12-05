import React, { useState } from "react";
import { createActivity } from "../../services/activityService"; // Убедитесь, что у вас есть такая функция
import "./ActivityFormAdd.css";
import axios from "axios";

const ActivityForm = ({ onActivityAdded }) => {
  const [formData, setFormData] = useState({
    city: "",
    datetime: "",
    title: "",
    description: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Создаем объект FormData
    const formDataToSend = new FormData();
    formDataToSend.append("city", formData.city);
    formDataToSend.append("datetime", formData.datetime);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      createActivity(formDataToSend);
      location.reload();
    } catch (err) {
      console.error("Error creating activity:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const clearForm = () => {
    setFormData({
      city: "",
      datetime: "",
      title: "",
      description: "",
      image: null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Datetime:</label>
        <input
          type="datetime-local"
          name="datetime"
          value={formData.datetime}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleChange} required />
      </div>

      <button type="submit">Create Activity</button>
    </form>
  );
};

export default ActivityForm;
