import "./profile.css";
import { useEffect, useState } from "react";
import { getUserById } from "../../managers/UserManager.jsx";
import { getAllPalettesWithSwatches } from "../../managers/PaletteManager.jsx";
import { getAllProjects } from "../../managers/ProjectManager.jsx";
import EditUser from "../forms/EditUser.jsx";
import { ProfilePaletteList } from "./ProfilePaletteList.jsx";

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [palettes, setPalettes] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchUser = () => {
    if (currentUser && currentUser.id) {
      getUserById(currentUser).then((user) => setUser(user));
    }
  };

  const fetchPalettes = () => {
    if (currentUser && currentUser.id) {
      getAllPalettesWithSwatches(currentUser).then((palettes) =>
        setPalettes(palettes)
      );
    }
  };

  const fetchProjects = () => {
    if (currentUser && currentUser.id) {
      getAllProjects(currentUser).then((projects) => setProjects(projects));
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPalettes();
    fetchProjects();
  }, [currentUser]);

  const date = user.joinDateTime;
  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className="flex-space-btwn">
        <div className="profile-container">
          <img className="profile-img" src={user.image} alt="Profile Image" />
          <div className="profile-info-container">
            <h1>{user.displayName}</h1>
            <hr />
            <p>
              <span className="profile-info-label">Member Since:</span>{" "}
              {formattedDate}
            </p>
            <p>
              <span className="profile-info-label">Projects:</span>{" "}
              {projects.length}
            </p>
            <p>
              <span className="profile-info-label">Palettes:</span>{" "}
              {palettes.length}
            </p>
            <hr />
            <p>{user.bio}</p>
          </div>
        </div>
        <div className="profile-container">
          <EditUser
            user={user}
            currentUser={currentUser}
            fetchUser={fetchUser}
          />
        </div>
      </div>
      <ProfilePaletteList currentUser={currentUser} />
    </>
  );
};
