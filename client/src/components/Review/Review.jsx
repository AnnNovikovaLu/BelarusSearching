import React, { useState } from "react";
import { useDispatch } from "react-redux";
import serverAPI from "../../services/serverAPI";
import { useParams } from "react-router-dom";

const Review = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    description: "",
    rating: 10,
  });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      serverAPI.createReview({ ...formData, hostId: id });
      setFormData("");
    } catch (error) {
      alert("Произошла ошибка при создании отзыва.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Оставить отзыв</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={formData.description}
          onChange={handleChange}
          name="description"
          placeholder="Напишите ваш отзыв здесь"
          rows={4}
          cols={50}
        ></textarea>
        <input
          type="number"
          value={formData.rating}
          onChange={handleChange}
          name="rating"
        />
        <button type="submit">Отправить отзыв</button>
      </form>
    </div>
  );
};

export default Review;
