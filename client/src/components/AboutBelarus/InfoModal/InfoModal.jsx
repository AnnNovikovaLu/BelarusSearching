import React, { useState, useEffect } from 'react';
import './InfoModal.css';

const cities = [
  {
    name: "Минск",
    description: "Столица Беларуси, известная своей богатой историей и культурным наследием.",
    image: "https://api.rbsmi.ru/attachments/c6d5dc84c4ac655c59588729a541e1c46713e02f/store/crop/0/0/1200/763/1600/0/0/a784da8a900be0c3b657b2436e2c95d2f6234ab2689367521605d92dad11/18d27926e98109fb26613ee3361807ec.jpg",
    mapLink: "https://www.google.com/maps/place/Minsk/"
  },
  {
    name: "Брест",
    description: "Город на западе Беларуси, знаменитый Брестской крепостью.",
    image: "https://youtravel.me/upload/tours/43129/media/19f/hxsu6jdz8y69adyq0ou6blztywntqvdw.jpg",
    mapLink: "https://www.google.com/maps/place/Brest/"
  },
  {
    name: "Гомель",
    description: "Крупный город на юге страны, известный своими парками и музеями.",
    image: "https://katarintravel.by/wp-content/uploads/2023/11/gomel-park8.png",
    mapLink: "https://www.google.com/maps/place/Gomel/"
  },
  {
    name: "Гродно",
    description: "Город на западе, известный своей архитектурой и историческими памятниками.",
    image: "https://myfin.by/source/1/v6_olwxTHUJDkSOs5gy8GUAHQCVaCxk4.jpg",
    mapLink: "https://www.google.com/maps/place/Grodno/"
  },
  {
    name: "Витебск",
    description: "Город на севере Беларуси, известный как родина художника Марка Шагала.",
    image: "https://dl-navigator.by/wp-content/uploads/2021/01/O-Parizh-Ty-moj-vtoroj-Vitebsk-1.jpg",
    mapLink: "https://www.google.com/maps/place/Vitebsk/"
  },
  {
    name: "Могилев",
    description: "Город на востоке страны с красивыми историческими зданиями.",
    image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65d499a97a6d30288d41c346_65d49ca26b45cf60f50dcbd7/scale_1200",
    mapLink: "https://www.google.com/maps/place/Mogilev/"
  },
];

const InfoModal = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cities.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>
        <div className="slider">
          <button className="navi-button" onClick={prevSlide}>❮</button>
          <div className="slider-item">
            <img src={cities[currentIndex].image} alt={cities[currentIndex].name} className="slider-image" />
            <div className="slider-info">
              <h3>{cities[currentIndex].name}</h3>
              <p>{cities[currentIndex].description}</p>
              <a href={cities[currentIndex].mapLink} target="_blank" rel="noopener noreferrer" className="map-link">Показать на карте</a>
            </div>
          </div>
          <button className="navi-button" onClick={nextSlide}>❯</button>
        </div>
        <button onClick={onClose} className="close-button">✖</button>
      </div>
    </div>
  );
};

export default InfoModal;

  /* return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="slider">
          <button className="nav-button" onClick={prevSlide}>❮</button>
          <div className="slider-item">
            <img src={cities[currentIndex].image} alt={cities[currentIndex].name} className="slider-image" />
            <div className="slider-info">
              <h3>{cities[currentIndex].name}</h3>
              <p>{cities[currentIndex].description}</p>
              <a href={cities[currentIndex].mapLink} target="_blank" rel="noopener noreferrer" className="map-link">Показать на карте</a>
            </div>
          </div>
          <button className="nav-button" onClick={nextSlide}>❯</button>
        </div>
        <button onClick={onClose} className="close-button">Закрыть</button>
      </div>
    </div>
  );
};

export default InfoModal; */

/* const InfoModal = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cities.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Информация о Беларуси</h2>
        <div className="slider">
          <button className="nav-button" onClick={prevSlide}>❮</button>
          <div className="slider-item">
            <img src={cities[currentIndex].image} alt={cities[currentIndex].name} className="slider-image" />
            <h3>{cities[currentIndex].name}</h3>
            <p>{cities[currentIndex].description}</p>
            <a href={cities[currentIndex].mapLink} target="_blank" rel="noopener noreferrer" className="map-link">Показать на карте</a>
          </div>
          <button className="nav-button" onClick={nextSlide}>❯</button>
        </div>
        <button onClick={onClose} className="close-button">Закрыть</button>
      </div>
    </div>
  );
};

export default InfoModal; */




/* import React from 'react';
import './InfoModal.css'; // Не забудьте создать файл стилей

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Информация о Беларуси</h2>
        <p>
          Беларусь — страна с богатой историей и культурным наследием. Здесь вы найдете множество красивых городов, каждый из которых имеет свои уникальные достопримечательности.
        </p>
        <h3>Города Беларуси:</h3>
        <ul>
          <li><a href="https://www.google.com/maps/place/Minsk/" target="_blank" rel="noopener noreferrer">Минск</a></li>
          <li><a href="https://www.google.com/maps/place/Brest/" target="_blank" rel="noopener noreferrer">Брест</a></li>
          <li><a href="https://www.google.com/maps/place/Gomel/" target="_blank" rel="noopener noreferrer">Гомель</a></li>
          <li><a href="https://www.google.com/maps/place/Grodno/" target="_blank" rel="noopener noreferrer">Гродно</a></li>
          <li><a href="https://www.google.com/maps/place/Vitebsk/" target="_blank" rel="noopener noreferrer">Витебск</a></li>
          <li><a href="https://www.google.com/maps/place/Mogilev/" target="_blank" rel="noopener noreferrer">Могилев</a></li>
        </ul>
        <button onClick={onClose} className="close-button">Закрыть</button>
      </div>
    </div>
  );
};

export default InfoModal; */