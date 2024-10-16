import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getProjectById,
  updateProject,
} from "../../managers/ProjectManager.jsx";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const EditProject = ({ currentUser }) => {
  let { projectId } = useParams();
  const [project, setProject] = useState({});
  const [updatedProject, setUpdatedProject] = useState({});

  const navigate = useNavigate();

  const fetchProject = () => {
    getProjectById(projectId).then((project) => setProject(project));
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    const editedProject = {
      id: projectId,
      name: updatedProject.name,
      userId: currentUser.id,
      blurb: updatedProject.blurb,
      notes: updatedProject.notes,
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
