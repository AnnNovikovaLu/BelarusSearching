import React from 'react';
import { Link } from 'react-router-dom';
import './HostCard.css';
import imageAPI from '../../services/imageApi'; // Импортируем ImageAPI

const HostCard = ({ host }) => {
  const handleBook = () => {
    // Логика для бронирования (например, перенаправление на страницу бронирования)
    console.log(`Booking host with ID: ${host.id}`);
    // Здесь можно использовать history.push или другой метод для редиректа на страницу бронирования
  };

  const handleReview = () => {
    // Логика для оставления отзыва (например, перенаправление на страницу отзыва)
    console.log(`Leaving review for host with ID: ${host.id}`);
    // Здесь можно использовать history.push или другой метод для редиректа на страницу отзыва
  };

  return (
    <div className="host-card">
      <Link to={`/hosts/available/${host.id}/details`}>
        <img src={imageAPI.getImage(host.image)} alt={host.city} className="host-image" />
        <div className="host-info">
          <h3 className="host-city">{host.city}</h3>
          <p className="host-address">{host.address}</p>
          <p className="host-guest-count">{host.guestCount} гостей</p>
        </div>
      </Link>
      <div className="host-actions">
        <button onClick={handleBook} className="book-button">Забронировать</button>
        <button onClick={handleReview} className="review-button">Оставить отзыв</button>
      </div>
    </div>
  );
};

export default HostCard;





// import React from 'react';
// import './HostCard.css';
// import imageAPI from '../../services/imageApi'; // Импортируем ImageAPI

// const HostCard = ({ host }) => {
//   return (
//     <div className="host-card">
      
//       <img src={imageAPI.getImage(host.image)} alt={host.city} className="host-image" /> {/* Используем поле image */}
//       <div className="host-info">
//         <h3 className="host-city">{host.city}</h3> {/* Город */}
//         <p className="host-address">{host.address}</p> {/* Адрес */}
//         <p className="host-guest-count">{host.guestCount} гостей</p> {/* Количество гостей */}
//       </div>
//     </div>
//   );
// };

// export default HostCard;