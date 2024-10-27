import { useEffect, useState } from "react";
import { ProfilePalette } from "./ProfilePalette.jsx";
import { getProfileProjectsByUserId } from "../../managers/ProjectManager.jsx";
import { ProfileProject } from "../projects/ProfileProject.jsx";

export const ProfileProjectList = ({ currentUser }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = () => {
    if (currentUser && currentUser.id) {
      getProfileProjectsByUserId(currentUser).then((projects) =>
        setProjects(projects)
      );
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentUser]);

  return (
    <>
      <div>
        {projects.length > 0
          ? projects.map((p) => <ProfileProject key={p.id} project={p} />)
          : null}
      </div>
    </>
  );
};
