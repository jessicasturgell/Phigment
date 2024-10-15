import "./profile.css";
import { useEffect, useState } from "react";
import { getUserById } from "../../managers/UserManager.jsx";

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState({});

  const fetchUser = () => {
    if (currentUser && currentUser.id) {
      getUserById(currentUser).then((user) => setUser(user));
    }
  };

  useEffect(() => {
    fetchUser();
  }, [currentUser]);

  return (
    <>
      <div className="profile-container">
        <img className="profile-img" src={user.image} />
        <div>
          <p>{user.displayName}</p>
          <p>Member Since: {user.joinDateTime}</p>
          <p>Projects: #</p>
          <p>Palettes: #</p>
          <p>Bio: {user.bio}</p>
        </div>
      </div>
    </>
  );
};
