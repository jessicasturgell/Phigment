import "./Project.css";
import { useEffect, useState } from "react";
import { getAllProjects } from "../../managers/ProjectManager.jsx";
import { Button } from "reactstrap";
import { Project } from "./Project.jsx";

export const ProjectList = ({ currentUser }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = () => {
    if (currentUser && currentUser.id) {
      getAllProjects(currentUser).then((projects) => setProjects(projects));
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentUser]);

  return (
    <>
      <div className="project-header-container">
        <div className="header-container">
          <h1>
            My <span className="project-list-header">Projects</span>
          </h1>
          <div>
            <Button color="primary">New Project</Button>
          </div>
        </div>
        <p>Here's an overview of all of your current projects!</p>
      </div>
      <hr className="project-list-hr" />
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </>
  );
};
