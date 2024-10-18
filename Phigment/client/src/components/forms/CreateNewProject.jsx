import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { addProject } from "../../managers/ProjectManager.jsx";

function CreateNewProject({ args, currentUser, handleProjectListChange }) {
  const [modal, setModal] = useState(false);
  const [project, setProject] = useState({});

  const handleSave = () => {
    if (project.name) {
      const singleProject = {
        name: project.name,
        userId: currentUser.id,
        blurb: project.blurb,
      };

      addProject(singleProject).then(toggle);
    } else {
      window.alert("Please give your project a name!");
    }
  };

  const toggle = () => {
    handleProjectListChange();
    setModal(!modal);
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Create New Project
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Create New Project</ModalHeader>
        <ModalBody>
          <Input
            placeholder="New Project Name"
            onChange={(event) => {
              const projectCopy = { ...project };
              projectCopy.name = event.target.value;
              setProject(projectCopy);
            }}
          ></Input>
          <br />
          <Input
            type="textarea"
            placeholder="Describe your project here..."
            onChange={(event) => {
              const projectCopy = { ...project };
              projectCopy.blurb = event.target.value;
              setProject(projectCopy);
            }}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateNewProject;
