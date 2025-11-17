import React, { useEffect, useState } from "react";
import imageAPI from "../../../services/imageAPI";
import "./VerifiedUsers.css";
// Импортируем ImageAPI

const VerifiedUsers = () => {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVerifiedUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/verification`);
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        const data = await response.json();
        setVerifiedUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVerifiedUsers();
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="verified-users-container">
      <h2 className="text_belarus">Верифицированные пользователи</h2>
      {verifiedUsers.length === 0 ? (
        <p>Нет верифицированных пользователей.</p>
      ) : (
        <div className="verified-users-grid">
          {verifiedUsers.map((user) => (
            <img
              key={user.userId}
              src={imageAPI.getImage(user.image)}
              alt={user.description}
              className="verified-user-image"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifiedUsers;
