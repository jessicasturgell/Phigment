import { useEffect, useState } from "react";
import { getAllProjects } from "../../managers/ProjectManager.jsx";

export const ProjectList = ({ currentUser }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = () => {
    getAllProjects(currentUser).then((projects) => setProjects(projects));
  };

  useEffect(() => {
    fetchProjects();
  }, [currentUser]);

  return (
    <>
      {projects.map((project) => (
        <p>{project.id}</p>
      ))}
    </>
  );
};
