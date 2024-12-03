import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="tagline">Ваш идеальный гид по Беларуси!</p>
        <div className="contact-info">
          <a href="mailto:info@belarussearching.com">info@belarussearching.com</a>
          <span> | </span>
          <a href="tel:+375291234567">+375 29 123-45-67</a>
        </div>
        <div className="social-media">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <span> | </span>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <span> | </span>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
        <p className="footer-note">© 2024 BelarusSearching. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;