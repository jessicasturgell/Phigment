import { useNavigate } from "react-router-dom";
import DeleteProject from "../forms/DeleteProject.jsx";

export const Project = ({ project, handleProjectListChange }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="project">
        {project.name}{" "}
        <div className="project-mgt-container">
          <span
            className="proj-details-span"
            style={{ marginRight: "25px", fontSize: "16px" }}
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            DETAILS
          </span>
          <DeleteProject
            project={project}
            handleProjectListChange={handleProjectListChange}
          />
        </div>
      </div>
      <p className="project-blurb">{project.blurb}</p>
      <hr className="project-list-hr" />
    </>
  );
};
