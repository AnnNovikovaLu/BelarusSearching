import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import serverAPI from "../../services/serverAPI";
import "./Register.css";
import {
  changeIsAuthorized,
  changeUserInfo,
} from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const succesReg = (value) => {
    serverAPI.setToken(value.token);
    dispatch(changeIsAuthorized(true));
    dispatch(changeUserInfo(value.user));
    Navigate("/");
  };

  const errorReg = (message) => {
    setError(message || "Ошибка регистрации. Пожалуйста, попробуйте снова.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    serverAPI.register(formData, succesReg, errorReg);
  };

  const validateForm = () => {
    const { name, surname, dateOfBirth, email, password } = formData;

    if (!name || !surname) {
      setError("Имя и фамилия обязательны.");
      return false;
    }
    if (!dateOfBirth) {
      setError("Дата рождения обязательна.");
      return false;
    }
    if (!email.includes("@")) {
      setError("Введите корректный Email.");
      return false;
    }
    if (password.length < 6) {
      setError("Пароль должен содержать не менее 6 символов.");
      return false;
    }

    setError(""); // Сброс ошибки
    return true;
  };

  return (
    <div className="registration-background">
    <div className="register-container">
      <h2>Регистрация</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Фамилия:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Дата рождения:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="register-button">
          Зарегистрироваться
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default RegisterPage;
