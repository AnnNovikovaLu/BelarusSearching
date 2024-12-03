import React, { useEffect, useState } from 'react';
import ActivityCard from './ActivityCard';
import ActivityForm from './ActivityFormAdd';
import { fetchActivities } from '../../services/activityService';
import './activities.css';

const ActivitiesList = () => {
    const [activities, setActivities] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null); // Состояние для редактирования

    useEffect(() => {
        const getActivities = async () => {
            const response = await fetchActivities(); // Получаем все активности
            if (Array.isArray(response)) {
                setActivities(response);
            } else {
                console.error('Expected an array but got:', response);
            }
        };

        getActivities();
    }, []);

    const handleActivityAdded = (newActivity) => {
        setActivities(prevActivities => [...prevActivities, newActivity]);
    };

    const handleActivityUpdated = (updatedActivity) => {
        setActivities(activities.map(activity =>
            activity.id === updatedActivity.id ? updatedActivity : activity
        ));
        setEditingActivity(null); // Сбросить состояние редактирования
    };

    const handleDeleteActivity = async (id) => {
        try {
            await deleteActivity(id);
            setActivities(activities.filter(activity => activity.id !== id)); // Удаляем активность из состояния
        } catch (error) {
            console.error('Failed to delete activity:', error);
        }
    };

    const handleEditClick = (activity) => {
        setEditingActivity(activity); // Устанавливаем активность для редактирования
    };

    return (
        <div className="activities-list">
            <button onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? 'Hide Form' : 'Add New Activity'}
            </button>
            {isFormVisible && <ActivityForm onActivityAdded={handleActivityAdded} />}
            {editingActivity ? (
                <ActivityFormEdit
                    activity={editingActivity}
                    onActivityUpdated={handleActivityUpdated}
                    onCancel={() => setEditingActivity(null)} // Сбросить состояние редактирования
                />
            ) : (
                activities.length > 0 ? (
                    activities.map(activity => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteActivity}
                        />
                    ))
                ) : (
                    <p>No activities found.</p>
                )
            )}
        </div>
    );
};

export default ActivitiesList;






/* import React, { useEffect, useState } from 'react';
import ActivityCard from './ActivityCard';
import ActivityForm from './ActivityFormAdd';
import { fetchActivities } from '../../services/activityService'; // Убедитесь, что у вас есть такой сервис
import './activities.css';


const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);



  useEffect(() => {
      const getActivities = async () => {
          const response = await fetchActivities(); // Получаем все активности
          if (Array.isArray(response)) {
              setActivities(response);
          } else {
              console.error('Expected an array but got:', response);
          }
      };

      getActivities();
  }, []);
  const handleActivityAdded = (newActivity) => {
    setActivities(prevActivities => [...prevActivities, newActivity]);
};

  return (
      <div className="activities-list">
        <button onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? 'Hide Form' : 'Add New Activity'}
            </button>
            {isFormVisible && <ActivityForm onActivityAdded={handleActivityAdded} />}
          {activities.length > 0 ? (
              activities.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
              ))
          ) : (
              <p>No activities found.</p>
          )}
      </div>
  );
};

export default ActivitiesList; */

