import React from 'react';
import imageAPI from '../../services/imageApi'; // Импортируем imageAPI
import './activities.css'; // Импортируем стили

const ActivityCard = ({ activity, onEdit, onDelete }) => {
    return (
        <div className="activity-card">
            <img src={imageAPI.getImage(activity.image)} alt={activity.title} />
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
            <p>{activity.city}</p> {/* Отображение города */}
            <div className="activity-card-buttons">
                <button onClick={() => onEdit(activity)}>Edit</button>
                <button onClick={() => onDelete(activity.id)}>Delete</button>
            </div>
        </div>
    );
};

export default ActivityCard;




// import React from 'react';
// import imageAPI from '../../services/imageApi'; // Импортируем imageAPI
// import './activities.css'; // Импортируем стили

// const ActivityCard = ({ activity }) => {
//     return (
//       <div className="activity-card">
//         <img src={imageAPI.getImage(activity.image)} alt={activity.title} /> {/* Используем imageAPI для получения изображения */}
//         <h2>{activity.title}</h2>
//         <p>{activity.description}</p>
//       </div>
//     );
//   };
  
//   export default ActivityCard;