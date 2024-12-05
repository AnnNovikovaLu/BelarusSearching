import React, { useState } from "react";
import serverAPI from "../../services/serverAPI";
import "./AddHost.css";
import { Navigate, useNavigate } from "react-router-dom";

const HostForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: "",
    address: "",
    guestCount: 1,
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("city", formData.city);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("guestCount", formData.guestCount);
    formDataToSend.append("image", formData.image);

    const clearForm = () => {
      setFormData({
        city: "",
        address: "",
        guestCount: 1,
        image: null,
      });
    };

    serverAPI.createHost(
      formDataToSend,
      () => {
        clearForm();
        navigate("/");
      },
      (errorMessage) => {
        console.error("Ошибка при создании хоста:", errorMessage);
      }
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Город:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Адрес:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Количество гостей:</label>
        <input
          type="number"
          name="guestCount"
          value={formData.guestCount}
          onChange={handleChange}
          min={1}
          required
        />
      </div>
      <div>
        <label>Изображение:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Добавить хост</button>
    </form>
  );
};

export default HostForm;

/* import React, { useState } from "react";
import "./AddHost.css";
import serverAPI from "../../services/serverAPI";

const HostForm = ({ onHostAdded }) => {
  const [formData, setFormData] = useState({
    city: "",
    address: "",
    guestCount: 1,
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("city", formData.city);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("guestCount", formData.guestCount);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const newHost = await serverAPI.createHost(formDataToSend); // Вызов функции createHost
      onHostAdded(newHost);
      clearForm();
    } catch (err) {
      console.error("Ошибка при создании хоста:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const clearForm = () => {
    setFormData({
      city: "",
      address: "",
      guestCount: 1,
      image: null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Город:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      

      <button type="submit">Добавить хост</button>
    </form>
  );
};

export default HostForm;
 */
