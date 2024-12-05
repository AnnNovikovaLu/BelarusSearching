import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import NavButton from "../NavButton/NavButton";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate(); // Инициализируем navigate

  const isAuth = useSelector((state) => state.userReducer.isAuthorized);
  const isVerified = useSelector((state) => state.userReducer.isVerified);

  return (
    <header className="header">
      <div className="logo">BelarusSearching</div>
      <div className="nav">
        <NavButton
          label="Мероприятия"
          onClick={() => navigate("/activities")}
        />{" "}
        {/* Переход на страницу мероприятий */}
        <NavButton label="Группы" onClick={() => navigate("/groups")} />{" "}
        {/* Переход на страницу групп */}
        {!isVerified && isAuth && (
          <NavButton
            label="Верификация"
            onClick={() => navigate("/verification")}
          />
        )}
        {isVerified && isAuth && (
          <NavButton label="Профиль" onClick={() => navigate("/profile")} />
        )}
      </div>
    </header>
  );
};

export default Header;
