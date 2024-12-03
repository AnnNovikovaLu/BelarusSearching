import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import NavButton from '../NavButton/NavButton';

const Header = () => {
    const navigate = useNavigate(); // Инициализируем navigate
 
   return (
      <header className="header">
        <div className="logo">BelarusSearching</div>
        <div className="nav">
         <NavButton label="Мероприятия" onClick={() => navigate('/activities')} /> {/* Переход на страницу мероприятий */}
         <NavButton label="Группы" onClick={() => navigate('/groups')} /> {/* Переход на страницу групп */}
         <NavButton label="Профиль" onClick={() => console.log("Profile")} />
       </div>
      </header>
    );
  };
  

export default Header;




