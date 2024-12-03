import React, { useEffect, useState } from "react";
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

export default HostDetails;
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
