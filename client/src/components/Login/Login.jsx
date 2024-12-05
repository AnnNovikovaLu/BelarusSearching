import React, { useState } from "react";
import { useDispatch } from "react-redux";
import serverAPI from "../../services/serverAPI";
import {
  changeIsAuthorized,
  changeUserInfo,
} from "../../store/slices/userSlice";
import { Link, Navigate } from "react-router-dom";
import "./Login.css"; // Подключаем файл стилей
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Валидация формы

    onSubmit({ email, password });
  };

  const validateForm = () => {
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

  const onSubmit = (data) => {
    serverAPI.login(data, succesLogin, errorLogin);
  };

  const succesLogin = (value) => {
    serverAPI.setToken(value.token);
    dispatch(changeIsAuthorized(true));
    dispatch(changeUserInfo(value.user));
    Navigate("/");
  };

  const errorLogin = (message) => {
    setError(message || "Ошибка входа. Пожалуйста, попробуйте снова.");
    setTimeout(() => {
      setError("");
    }, 6000);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Вход</h2>
        <p className="welcome-message">Добро пожаловать на BelarusSearching</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Войти
          </button>
        </form>
        <div className="register-link">
          <p>
            Нет аккаунта?{" "}
            <Link to="/registration" className="register-button">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

/* import React, { useState } from "react";
import { useDispatch } from "react-redux";
import serverAPI from "../../services/serverAPI";
import {
  changeIsAuthorized,
  changeUserInfo,
} from "../../store/slices/userSlice";
import { data, Navigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
    serverAPI.login({ email, password });
  };

  const onSubmit = (data) => {
    serverAPI.login(data, succesLogin, errorLogin);
  };

  const succesLogin = (value) => {
    serverAPI.setToken(value.token);
    dispatch(changeIsAuthorized(true));
    dispatch(changeUserInfo(value.user));
    Navigate("/");
  };

  const errorLogin = (message) => {
    setIsLoading(false);
    if (message) {
      setModal({ isShowed: true, text: message });
    } else {
      setModal({ isShowed: true, text: "Error" });
    }

    setTimeout(() => {
      setModal({ isShowed: false, text: "" });
    }, 6000);
  };

  return (
    <div className="login-container">
      <h2>Вход</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage; */
