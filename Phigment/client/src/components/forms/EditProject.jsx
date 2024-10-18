import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getProjectById,
  updateProject,
} from "../../managers/ProjectManager.jsx";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  getAllPalettes,
  getAllPalettesByProjectIdWithSwatches,
} from "../../managers/PaletteManager.jsx";
import { ProjectPalette } from "../palettes/ProjectPalette.jsx";
import { EditProjectPalette } from "../palettes/EditProjectPalette.jsx";
import AddProjectPalette from "./AddProjectPalette.jsx";

export const EditProject = ({ currentUser }) => {
  let { projectId } = useParams();
  const [project, setProject] = useState({});
  const [palettes, setPalettes] = useState([]);
  const [updatedProject, setUpdatedProject] = useState({});

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

  const handleUpdatePalettes = () => {
    fetchProjectPalettes();
  };

  const handleSave = (event) => {
    event.preventDefault();

    const editedProject = {
      id: projectId,
      name: updatedProject.name || project.name,
      userId: currentUser.id,
      blurb: updatedProject.blurb || project.blurb,
      notes: updatedProject.notes || project.notes,
      isPublic: false,
    };

    updateProject(editedProject).then(navigate(`/projects/${projectId}`));
  };

  return (
    <>
      <div className="palette-header-container">
        <div className="header-container">
          <h1 style={{ fontStyle: "italic" }}>
            Currently editing{" "}
            <span className="project-edit-header" to={"/projects"}>
              {project.name}
            </span>
            ...
          </h1>
        </div>
      </div>
      <div className="edit-project-container">
        <div className="edit-project-container-child">
          <Form onSubmit={handleSave}>
            <FormGroup>
              <Label>Project Name</Label>
              <Input
                defaultValue={project.name}
                onChange={(event) => {
                  const projectCopy = { ...project };
                  projectCopy.name = event.target.value;
                  setUpdatedProject(projectCopy);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Blurb</Label>
              <Input
                type="textarea"
                defaultValue={project.blurb}
                onChange={(event) => {
                  const projectCopy = { ...project };
                  projectCopy.blurb = event.target.value;
                  setUpdatedProject(projectCopy);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Notes</Label>
              <Input
                type="textarea"
                defaultValue={project.notes}
                onChange={(event) => {
                  const projectCopy = { ...project };
                  projectCopy.notes = event.target.value;
                  setUpdatedProject(projectCopy);
                }}
              ></Input>
            </FormGroup>
            <FormGroup>
              <div className="flex">
                <Label>Color Palettes</Label>
                <AddProjectPalette
                  currentUser={currentUser}
                  project={project}
                  handleUpdatePalettes={handleUpdatePalettes}
                />
              </div>
              <div className="flex">
                {palettes.map((p) => (
                  <EditProjectPalette
                    key={p.id}
                    palette={p}
                    currentUser={currentUser}
                    handleUpdatePalettes={handleUpdatePalettes}
                  />
                ))}
              </div>
            </FormGroup>
            <div className="cancel-btn-container">
              <Button
                style={{ marginRight: "1em" }}
                color="danger"
                onClick={() => navigate(`/projects/${projectId}`)}
              >
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
