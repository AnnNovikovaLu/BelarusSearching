// src/components/Groups/GroupList.jsx
import React, { useEffect, useState } from 'react';
import GroupCard from '../GroupCard/GroupCard'; // Импортируем компонент карточки группы
import { fetchGroups } from '../../services/groupService'; // Импортируем функцию получения групп
import './GroupList.css'; // Импортируем стили

const GroupList = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const getGroups = async () => {
            const response = await fetchGroups(); // Получаем группы без пагинации
            if (Array.isArray(response)) { // Проверяем, что это массив
                setGroups(response); // Устанавливаем массив групп
            } else {
                console.error('Expected an array but got:', response);
            }
        };

        getGroups();
    }, []); // Пустой массив зависимостей, чтобы вызвать getGroups только один раз при монтировании

    return (
        <div className="group-list"> {/* Используем класс group-list */}
            {groups.length > 0 ? (
                groups.map(group => (
                    <GroupCard key={group.id} group={group} />
                ))
            ) : (
                <p>No groups found.</p>
            )}
        </div>
    );
};

export default GroupList;



/* // src/components/Groups/GroupList.jsx
import React, { useEffect, useState } from 'react';
import GroupCard from '../GroupCard/GroupCard';// Импортируем компонент карточки группы
import { fetchGroups } from '../../services/groupService'; // Импортируем функцию получения групп
//import './GroupList.css'; // Импортируем стили

const GroupList = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const getGroups = async () => {
            const response = await fetchGroups(); 
            if (Array.isArray(response)) { 
                setGroups(response); 
            } else {
                console.error('Expected an array but got:', response);
            }
        };

        getGroups();
    }, []);

    return (
        <div className="group-list">
            {groups.length > 0 ? (
                groups.map(group => (
                    <GroupCard key={group.id} group={group} />
                ))
            ) : (
                <p>No groups found.</p>
            )}
        </div>
    );
};

export default GroupList;
 */



