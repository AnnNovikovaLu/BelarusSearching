import React, { useState } from "react";
import "./GroupCard.css";
import imageAPI from "../../services/imageAPI";

const GroupCard = ({ group }) => {
  const [isMember, setIsMember] = useState(false);
  console.log(group);

  const handleJoinGroup = () => {
    console.log(`Joining group: ${group.title}`);
    setIsMember(true);
  };

  const handleLeaveGroup = () => {
    console.log(`Leaving group: ${group.title}`);
    setIsMember(false);
  };

  return (
    <div className="group-card">
      <img
        src={imageAPI.getImage(group.image)}
        alt={group.title}
        className="group-image"
      />
      <div className="group-info">
        <h3 className="group-title">{group.title}</h3>
        <p className="group-description">{group.description}</p>
        <div className="group-members">
          <h4>Members:</h4>
          <div className="member-list">
            {group.users && group.users.length > 0 ? (
              group.users.map((user) => (
                <div key={user.id} className="member">
                  {user.verification && (
                    <img
                      src={imageAPI.getImage(user.verification.image)}
                      alt={`${user.name} ${user.surname}`}
                      className="member-avatar"
                    />
                  )}
                  <span>
                    {user.name} {user.surname}
                  </span>
                </div>
              ))
            ) : (
              <p>No members found.</p>
            )}
          </div>
        </div>
        <div className="group-actions">
          {isMember ? (
            <button onClick={handleLeaveGroup} className="leave-button">
              Выйти из группы
            </button>
          ) : (
            <button onClick={handleJoinGroup} className="join-button">
              Вступить в группу
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
