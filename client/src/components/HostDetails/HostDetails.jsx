import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HostDetails.css";
import imageAPI from "../../services/imageAPI";

const HostDetails = () => {
  const { hostId } = useParams();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPhone, setShowPhone] = useState(false); // Состояние для показа номера телефона

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hosts/${hostId}`
        );
        setHost(response.data);
      } catch (error) {
        console.error("Error fetching host details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostDetails();
  }, [hostId]);

  if (loading) return <p>Loading...</p>;
  if (!host) return <p>Host not found.</p>;

  const { user } = host; // Извлекаем user из host
  const { verification } = user || {}; // Извлекаем verification из user с безопасной проверкой

  return (
    <div className="host-details">
      <div className="details-container">
        <div className="apartment-info">
          <h3 className="user-heading">Информация о хосте</h3>
          <h2>{host.city}</h2>
          <p>Адрес: {host.address}</p>
          <p>Максимальное количество гостей: {host.guestCount}</p>
          <img src={imageAPI.getImage(host.image)} alt={host.city} />
          <div className="button-container">
            <button className="reserve-button">Забронировать</button>
            <button className="review-button">Оставить отзыв</button>
          </div>
        </div>
        <div className="user-info">
          {user ? (
            <div className="verification-info">
              {verification ? (
                <>
                  <h3 className="user-heading">Информация о пользователе</h3>
                  <img
                    src={imageAPI.getImage(verification.image)}
                    alt={`${user.name} ${user.surname}`}
                    className="user-image"
                  />
                  <h4 className="user-name-heading">
                    {user.name} {user.surname}
                  </h4>
                  <p>
                    Для бронирования пишите на email:
                    <a href={`mailto:${user.email}`} className="email-button">
                      {user.email}
                    </a>
                  </p>
                  <button
                    className="show-phone-button"
                    onClick={() => setShowPhone(!showPhone)}
                  >
                    {showPhone ? "Скрыть номер" : "Показать номер"}
                  </button>
                  {showPhone && <p>Телефон: {verification.phoneNumber}</p>}
                  <p className="description-heading">
                    {verification.description}
                  </p>
                  <h5 className="interests-heading">Интересы:</h5>
                  <p>{verification.interests.split(",").join(", ")}</p>
                </>
              ) : (
                <p>No verification information available.</p>
              )}
            </div>
          ) : (
            <p>No user information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostDetails;

/* const HostDetails = () => {
  const { hostId } = useParams();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hosts/${hostId}`
        );
        setHost(response.data);
      } catch (error) {
        console.error("Error fetching host details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostDetails();
  }, [hostId]);

  if (loading) return <p>Loading...</p>;
  if (!host) return <p>Host not found.</p>;

  const { user } = host; // Извлекаем user из host
  const { verification } = user || {}; // Извлекаем verification из user с безопасной проверкой

  return (
    <div className="host-details">
      <div className="details-container">
        <div className="apartment-info">
        <h3>Host Information</h3>
          <h2>{host.city}</h2>
          <p>Address: {host.address}</p>
          <p>Guest Count: {host.guestCount}</p>
          <img src={imageAPI.getImage(host.image)} alt={host.city} />
        </div>
        <div className="user-info">
          
          {user ? (
            <div className="verification-info">
              {verification ? (
                <>
                <h3>Информация о пользователе</h3>
                  <img
                    src={imageAPI.getImage(verification.image)} // Используем imageAPI для получения изображения
                    alt={`${user.name} ${user.surname}`}
                  />
                  <p> {user.name} {user.surname}</p>
                  <p>Договоритесь о БРОНИ!(пишите на email)
                    <a href={`mailto:${user.email}`} className="email-button">
                      {user.email}
                    </a>
                  </p>
                  <p>Phone: {verification.phoneNumber}</p>
                  <p> {verification.description}</p>
                  <p>Интересы: {verification.interests.split(",").join(", ")}</p>
                </>
              ) : (
                <p>No verification information available.</p>
              )}
            </div>
          ) : (
            <p>No user information available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostDetails; */

/* const HostDetails = () => {
  const { hostId } = useParams();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hosts/${hostId}`
        );
        setHost(response.data);
      } catch (error) {
        console.error("Error fetching host details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostDetails();
  }, [hostId]);

  if (loading) return <p>Loading...</p>;
  if (!host) return <p>Host not found.</p>;

  const { user } = host; // Извлекаем user из host
  const { verification } = user || {}; // Извлекаем verification из user с безопасной проверкой

  return (
    <div className="host-details">
      <h3>Host Information</h3>
      <h2>{host.city}</h2>
      <p>Address: {host.address}</p>
      <p>Guest Count: {host.guestCount}</p>
      <img src={imageAPI.getImage(host.image)} alt={host.city} />
      
      {user ? (
        <div className="verification-info">
          {verification ? (
            <>
             <h3>Информация о пользователе</h3>
              <img
                src={imageAPI.getImage(verification.image)} // Используем imageAPI для получения изображения
                alt={`${user.name} ${user.surname}`}
              />
              <p>Name: {user.name} {user.surname}</p>
              <p>Email: 
                <a href={`mailto:${user.email}`} className="email-button">
                  {user.email}
                </a>
              </p>
              <p>Phone: {verification.phoneNumber}</p>
              <p>Description: {verification.description}</p>
              <p>Interests: {verification.interests.split(",").join(", ")}</p>
            </>
          ) : (
            <p>No verification information available.</p>
          )}
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default HostDetails; */

/* const HostDetails = () => {
  const { hostId } = useParams();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hosts/${hostId}`
        );
        setHost(response.data);
      } catch (error) {
        console.error("Error fetching host details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostDetails();
  }, [hostId]);

  if (loading) return <p>Loading...</p>;
  if (!host) return <p>Host not found.</p>;

  const { user } = host; // Извлекаем user из host
  const { verification } = user || {}; // Извлекаем verification из user с безопасной проверкой

  return (
    <div className="host-details">
      <h2>{host.city}</h2>
      <p>Address: {host.address}</p>
      <p>Guest Count: {host.guestCount}</p>
      <img src={imageAPI.getImage(host.image)} alt={host.city} />
      <h3>Host Information</h3>
      {user ? (
        <>
          {verification ? (
            <>
              <img
                src={imageAPI.getImage(verification.image)} // Используем imageAPI для получения изображения
                alt={`${user.name} ${user.surname}`}
              />
              <p>
                Name: {user.name} {user.surname}
              </p>
              <p>Email: {user.email}</p>
              <p>Phone: {verification.phoneNumber}</p>
              <p>Description: {verification.description}</p>
              <p>Interests: {verification.interests.split(",").join(", ")}</p>
            </>
          ) : (
            <p>No verification information available.</p>
          )}
        </>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default HostDetails; */

/* import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HostDetails = () => {
  const { hostId } = useParams();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hosts/${hostId}`
        );
        setHost(response.data);
      } catch (error) {
        console.error("Error fetching host details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostDetails();
  }, [hostId]);

  if (loading) return <p>Loading...</p>;
  if (!host) return <p>Host not found.</p>;

  const { user } = host; // Извлекаем user из host
  const { verification } = user || {}; // Извлекаем verification из user с безопасной проверкой

  return (
    <div className="host-details">
      <h2>{host.city}</h2>
      <p>Address: {host.address}</p>
      <p>Guest Count: {host.guestCount}</p>
      <img src={host.image} alt={host.city} />
      <h3>Host Information</h3>
      {user ? (
        <>
          {verification ? (
            <>
              <img
                src={verification.image}
                alt={`${user.name} ${user.surname}`}
              />
              <p>
                Name: {user.name} {user.surname}
              </p>
              <p>Email: {user.email}</p>
              <p>Phone: {verification.phoneNumber}</p>
              <p>Description: {verification.description}</p>
              <p>Interests: {verification.interests.split(",").join(", ")}</p>
            </>
          ) : (
            <p>No verification information available.</p>
          )}
        </>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default HostDetails; */

/* return (
    <div className="host-details">
      <h2>{host.city}</h2>
      <p>Address: {host.address}</p>
      <p>Guest Count: {host.guestCount}</p>
      <img src={host.image} alt={host.city} />
      <h3>Host Information</h3>
      {user && (
        <>
          <img src={verification?.image} alt={`${user.name} ${user.surname}`} />
          <p>Name: {user.name} {user.surname}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {verification?.phoneNumber}</p>
          <p>Description: {verification?.description}</p>
          <p>Interests: {verification?.interests?.split(',').join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default HostDetails; */

/* import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HostDetails = () => {
  const { hostId } = useParams();
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const response = await axios.get(`/hosts/${hostId}/details`); // Новый маршрут
        setHost(response.data);
      } catch (error) {
        console.error('Error fetching host details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostDetails();
  }, [hostId]);

  if (loading) return <p>Loading...</p>;
  if (!host) return <p>Host not found.</p>;

  return (
    <div className="host-details">
      <h2>{host.city}</h2>
      <p>Address: {host.address}</p>
      <p>Guest Count: {host.guestCount}</p>
      <img src={host.image} alt={host.city} />
      <h3>Host Information</h3>
      <img src={host.user.verification?.image} alt={`${host.user.name} ${host.user.surname}`} />
      <p>Name: {host.user.name} {host.user.surname}</p>
      <p>Email: {host.user.email}</p>
      <p>Phone: {host.user.verification?.phoneNumber}</p>
      <p>Description: {host.user.verification?.description}</p>
      <p>Interests: {host.user.verification?.interests.split(',').join(', ')}</p>
    </div>
  );
};

export default HostDetails; */
