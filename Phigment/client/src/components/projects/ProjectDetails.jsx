import { Link, useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../managers/ProjectManager.jsx";
import { useEffect, useState } from "react";
import { getAllPalettesByProjectIdWithSwatches } from "../../managers/PaletteManager.jsx";
import { ProjectPalette } from "../palettes/ProjectPalette.jsx";

export const ProjectDetails = ({ currentUser }) => {
  let { projectId } = useParams();
  const [project, setProject] = useState({});
  const [palettes, setPalettes] = useState([]);
  const navigate = useNavigate();

  const fetchProject = () => {
    getProjectById(projectId).then((project) => setProject(project));
  };

  const fetchProjectPalettes = () => {
    if (currentUser) {
      getAllPalettesByProjectIdWithSwatches(projectId).then((palettes) =>
        setPalettes(palettes)
      );
    }
  };

  useEffect(() => {
    fetchProject();
    fetchProjectPalettes();
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
      <div className="project-blurb flex">
        {palettes.map((p) => (
          <ProjectPalette key={p.id} palette={p} currentUser={currentUser} />
        ))}
      </div>
      <hr className="project-list-hr" />
    </>
  );
};
