import React, { useEffect, useState } from 'react';
import { fetchVerifiedUsers } from '../../../services/verifiedUsersService';
import './VerifiedUsers.css';


const VerifiedUsers = () => {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Для обработки ошибок

  useEffect(() => {
    const loadVerifiedUsers = async () => {
      try {
        const result = await fetchVerifiedUsers(); // Получаем данные верифицированных пользователей
        setVerifiedUsers(result.data); // Сохраняем пользователей в состоянии
      } catch (err) {
        console.error('Error fetching verified users:', err);
        setError('Не удалось загрузить верифицированных пользователей.'); // Устанавливаем сообщение об ошибке
      } finally {
        setLoading(false); // Устанавливаем флаг загрузки в false
      }
    };

    loadVerifiedUsers();
  }, []);

  if (loading) {
    return <p>Загрузка верифицированных пользователей...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Отображаем ошибку, если она произошла
  }

  return (
    <div className="verified-users">
      <h3>Верифицированные пользователи</h3>
      {verifiedUsers.length > 0 ? (
        <ul>
          {verifiedUsers.map(user => (
            <li key={user.id}>
              {user.verification && user.verification.image && (
                <img src={user.verification.image} alt={`${user.name} ${user.surname}`} />
              )}
              {user.name} {user.surname}
            </li>
          ))}
        </ul>
      ) : (
        <p>Верифицированные пользователи не найдены.</p>
      )}
    </div>
  );
};

export default VerifiedUsers;