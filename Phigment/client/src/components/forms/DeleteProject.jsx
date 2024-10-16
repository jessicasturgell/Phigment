import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteProject } from "../../managers/ProjectManager.jsx";

function DeleteProject({ args, project, handleProjectListChange }) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    handleProjectListChange();
    setModal(!modal);
  };

  const handleDelete = () => {
    deleteProject(project.id).then(toggle);
  };

  return (
    <>
      <span style={{ color: "yellow", fontSize: "16px" }} onClick={toggle}>
        DELETE PROJECT
      </span>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Delete Project</ModalHeader>
        <ModalBody>
          Are you sure you want to delete your project "{project.name}"?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DeleteProject;
