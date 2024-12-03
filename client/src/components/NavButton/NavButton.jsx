import React from 'react';
import './NavButton.css'; // Импортируйте стили, если есть

const NavButton = ({ label, onClick }) => {
  return (
    <button className="nav-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default NavButton;