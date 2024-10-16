import { Link, useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../managers/ProjectManager.jsx";
import { useEffect, useState } from "react";
import DeleteProject from "../forms/DeleteProject.jsx";

export const ProjectDetails = () => {
  let { projectId } = useParams();
  const [project, setProject] = useState({});
  const navigate = useNavigate();

  const fetchProject = () => {
    getProjectById(projectId).then((project) => setProject(project));
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <>
      <div className="palette-header-container">
        <div className="header-container">
          <h1>
            <Link className="palette-details-header" to={"/projects"}>
              {project.name}
            </Link>{" "}
            Details
          </h1>
        </div>
      </div>
      <div className="project">
        {project.name}{" "}
        <div className="project-mgt-container">
          <span
            style={{ color: "yellow", fontSize: "16px" }}
            onClick={() => navigate(`/projects/${project.id}/edit`)}
          >
            EDIT PROJECT
          </span>
        </div>
      </div>
      <p className="project-blurb">{project.blurb}</p>
      <div className="project-banner">Notes</div>
      <p className="project-blurb">{project.notes}</p>
      <div className="project-banner">Color Palettes</div>
      <p className="project-blurb">To do</p>
      <hr className="project-list-hr" />
    </>
  );
};
