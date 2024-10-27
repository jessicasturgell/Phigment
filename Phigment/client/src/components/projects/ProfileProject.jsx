import { useNavigate } from "react-router-dom";
import DeleteProject from "../forms/DeleteProject.jsx";

export const ProfileProject = ({ project }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="profile-project">
        {project.name}{" "}
        <div className="profile-project-mgt-container">
          <span
            className="proj-details-span"
            style={{ fontSize: "16px" }}
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            DETAILS
          </span>
        </div>
      </div>
      <p className="profile-project-blurb">{project.blurb}</p>
    </>
  );
};
