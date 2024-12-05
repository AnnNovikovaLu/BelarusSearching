import React, { useState } from "react";
import InfoModal from "./InfoModal/InfoModal";
import "./AboutBelarus.css";
import VerifiedUsers from "./VerifiedUsers/VerifiedUsers";



const AboutBelarus = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="about-container">
      <h2 className = "text_belarus">Сеть гостеприимств</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            Добро пожаловать в сеть гостеприимств по Беларуси! Здесь предложены
            разнообразные варианты размещения, которые подойдут как для одиночных
            путешественников, так и для семейных пар или больших групп.
          </p>
          <p>
            Цель — предоставить вам комфортное и незабываемое пребывание в самых
            красивых уголках Беларуси. Мы гордимся качеством обслуживания и
            индивидуальным подходом к каждому гостю.
          </p>
          <p>
            Здесь люди предлагают свое жилье безвозмездно. Это возможность не только
            для бесплатного пребывания, но и для нахождения новых знакомств и друзей
            по всей Беларуси.
          </p>
          <button onClick={handleOpenModal} className="info-button">
            Узнать больше о Беларуси
          </button>
          <InfoModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
        <div className="verified-users-container">
          <VerifiedUsers />  
        </div>
      </div>
    </div>
  );
};

export default AboutBelarus;
/* const AboutBelarus = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="about-container">
      <h2>Сеть гостеприимств</h2>
      <p>
        Добро пожаловать в сеть гостеприимств по Беларуси! Здесь предложены
        разнообразные варианты размещения, которые подойдут как для одиночных
        путешественников, так и для семейных пар или больших групп.
      </p>
      <p>
        Цель — предоставить вам комфортное и незабываемое пребывание в самых
        красивых уголках Беларуси. Мы гордимся качеством обслуживания и
        индивидуальным подходом к каждому гостю.
      </p>
      <p>
        Здесь люди предлагают свое жилье безвозмездно. Это возможность не только
        для бесплатного пребывания, но и для нахождения новых знакомств и друзей
        по всей Беларуси
      </p>
      <button onClick={handleOpenModal} className="info-button">
        Узнать больше о Беларуси
      </button>
      <InfoModal isOpen={isModalOpen} onClose={handleCloseModal} />
       <VerifiedUsers />  
    </div>
  );
};

export default AboutBelarus; */
