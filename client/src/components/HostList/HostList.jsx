import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import HostCard from "../HostCard/HostCard";
import { fetchHosts } from "../../services/hostService";
import "./HostList.css";

const HostList = () => {
  const [hosts, setHosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const hostsPerPage = 3;

  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate(); // Инициализация navigate

  useEffect(() => {
    const getHosts = async () => {
      const response = await fetchHosts(currentPage, hostsPerPage);
      if (response && response.data) {
        setHosts(response.data);
        setTotalPages(response.pagination.total_pages);
      }
    };

    getHosts();
  }, [currentPage]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGuestCountChange = (event) => {
    setGuestCount(event.target.value);
  };

  const filteredHosts = hosts.filter((host) => {
    const matchesCity = host.city
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGuestCount = guestCount
      ? host.guestCount >= Number(guestCount)
      : true;
    return matchesCity && matchesGuestCount;
  });

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleAddHostClick = () => {
    navigate("/add-host"); // Используем navigate для перехода на страницу добавления нового хоста
  };

  return (
    <div className="host-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Введите город для поиска"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={guestCount}
          onChange={handleGuestCountChange}
          className="guest-select"
        >
          <option value="">Выберите количество гостей</option>
          {guestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button className="add-host-button" onClick={handleAddHostClick}>
        Добавить новый хост
      </button>
      <div className="hosts">
        {filteredHosts.length > 0 ? (
          filteredHosts.map((host) => <HostCard key={host.id} host={host} />)
        ) : (
          <p>No hosts found.</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HostList;

/* import React, { useEffect, useState } from 'react';
import HostCard from '../HostCard/HostCard';
import { fetchHosts } from '../../services/hostService';
import './HostList.css';

const HostList = () => {
  const [hosts, setHosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const hostsPerPage = 3;

  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const getHosts = async () => {
      const response = await fetchHosts(currentPage, hostsPerPage);
      if (response && response.data) {
        setHosts(response.data);
        setTotalPages(response.pagination.total_pages);
      }
    };

    getHosts();
  }, [currentPage]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGuestCountChange = (event) => {
    setGuestCount(event.target.value);
  };

  const filteredHosts = hosts.filter(host => {
    const matchesCity = host.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGuestCount = guestCount ? host.guestCount >= Number(guestCount) : true;
    return matchesCity && matchesGuestCount;
  });

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="host-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by city"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={guestCount} onChange={handleGuestCountChange} className="guest-select">
          <option value="">Select number of guests</option>
          {guestOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="hosts">
        {filteredHosts.length > 0 ? (
          filteredHosts.map(host => (
            <HostCard key={host.id} host={host} />
          ))
        ) : (
          <p>No hosts found.</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HostList; */

/* import React, { useEffect, useState } from 'react';
import HostCard from '../HostCard/HostCard';
import { fetchHosts } from '../../services/hostService';
import './HostList.css';

const HostList = () => {
  const [hosts, setHosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения ввода поиска
  const [guestCount, setGuestCount] = useState(''); // Состояние для хранения выбранного количества гостей
  const hostsPerPage = 3; // Количество карточек на странице

  // Предустановленный список значений для выбора количества гостей
  const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const getHosts = async () => {
      const response = await fetchHosts(currentPage, hostsPerPage);
      if (response && response.data) {
        setHosts(response.data);
        setTotalPages(response.pagination.total_pages); // Устанавливаем общее количество страниц
      } else {
        console.error('Expected an object with a data array but got:', response);
      }
    };

    getHosts();
  }, [currentPage]); // Добавляем currentPage как зависимость

  // Функция для обработки ввода поиска
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Функция для обработки изменения количества гостей
  const handleGuestCountChange = (event) => {
    setGuestCount(event.target.value);
  };

  // Фильтрация хостов по городу и количеству гостей
  const filteredHosts = hosts.filter(host => {
    const matchesCity = host.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGuestCount = guestCount ? host.guestCount >= Number(guestCount) : true; // Изменено на >=

    return matchesCity && matchesGuestCount;
  });

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="host-list">
      <input
        type="text"
        placeholder="Search by city"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="guest-filter">
        <select value={guestCount} onChange={handleGuestCountChange}>
          <option value="">Select number of guests</option>
          {guestOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      {filteredHosts.length > 0 ? (
        filteredHosts.map(host => (
          <HostCard key={host.id} host={host} />
        ))
      ) : (
        <p>No hosts found.</p>
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HostList; */

/* import React, { useEffect, useState } from 'react';
import HostCard from '../HostCard/HostCard';
import { fetchHosts } from '../../services/hostService';
import './HostList.css';

const HostList = () => {
  const [hosts, setHosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения ввода поиска
  const hostsPerPage = 3; // Количество карточек на странице

  useEffect(() => {
    const getHosts = async () => {
      const response = await fetchHosts(currentPage, hostsPerPage);
      if (response && response.data) {
        setHosts(response.data);
        setTotalPages(response.pagination.total_pages); // Устанавливаем общее количество страниц
      } else {
        console.error('Expected an object with a data array but got:', response);
      }
    };

    getHosts();
  }, [currentPage]); // Добавляем currentPage как зависимость

  // Функция для обработки ввода поиска
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Фильтрация хостов по городу
  const filteredHosts = hosts.filter(host =>
    host.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="host-list">
      <input
        type="text"
        placeholder="Search by city"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredHosts.length > 0 ? (
        filteredHosts.map(host => (
          <HostCard key={host.id} host={host} />
        ))
      ) : (
        <p>No hosts found.</p>
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HostList; */
