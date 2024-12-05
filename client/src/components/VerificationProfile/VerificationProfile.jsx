import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./VerificationProfile.css"; // Подключаем файл стилей
import { changeIsVerified, changeUserInfo } from "../../store/slices/userSlice";
import serverAPI from "../../services/serverAPI";
import { useDispatch } from "react-redux";

const VerificationProfile = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    description: "",
    interests: "",
    image: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Валидация формы

    // Здесь можно отправить данные на сервер
    serverAPI.verify(formData, succesReg, errorReg);
  };

  const succesReg = (value) => {
    // serverAPI.setToken(value.token);
    // dispatch(changeUserInfo(value.user));
    dispatch(changeIsVerified(true));
    navigate("/");
  };

  const errorReg = (message) => {
    setError(message || "Ошибка регистрации. Пожалуйста, попробуйте снова.");
  };

  const validateForm = () => {
    const { phoneNumber, description, interests, image } = formData;

    if (!phoneNumber) {
      setError("Номер телефона обязателен.");
      return false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Введите корректный номер телефона (Беларусь или Россия).");
      return false;
    }

    if (!description) {
      setError("Описание обязательно.");
      return false;
    }

    if (!interests) {
      setError("Интересы обязательны.");
      return false;
    }

    if (!image) {
      setError("Изображение обязательно.");
      return false;
    }

    setError(""); // Сброс ошибки
    return true;
  };

  const validatePhoneNumber = (number) => {
    const belarusRegex = /^\+375\d{9}$/; // Формат: +375XXXXXXXXX
    const russiaRegex = /^\+7\d{10}$/; // Формат: +7XXXXXXXXXX
    return belarusRegex.test(number) || russiaRegex.test(number);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="verification-container">
      <h2>Верификация профиля</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="verification-form">
        <div className="form-group">
          <label htmlFor="phoneNumber">Номер телефона:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="interests">Интересы:</label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Загрузить изображение:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="verification-button">
          Подтвердить
        </button>
      </form>
    </div>
  );
};

export default VerificationProfile;
