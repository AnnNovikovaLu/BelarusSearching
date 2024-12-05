import React from "react";
import { Link } from "react-router-dom";
import "./HostCard.css";
import imageAPI from "../../services/imageAPI";

const HostCard = ({ host }) => {
  const handleBook = () => {
    console.log(`Booking host with ID: ${host.id}`);
  };

  const handleReview = () => {
    console.log(`Leaving review for host with ID: ${host.id}`);
  };

  return (
    <div className="host-card">
      <Link to={`/hosts/available/${host.id}/details`}>
        <img
          src={imageAPI.getImage(host.image)}
          alt={host.city}
          className="host-image"
        />
        <div className="host-info">
          <h3 className="host-city">{host.city}</h3>
          <p className="host-address">{host.address}</p>
          <p className="host-guest-count">{host.guestCount} гостей</p>
        </div>
      </Link>
      <div className="host-actions">
        <button onClick={handleBook} className="book-button">
          Забронировать
        </button>
        <Link to={`/hosts/${host.id}/reviews`} className="review-button">
          Оставить отзыв
        </Link>
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
