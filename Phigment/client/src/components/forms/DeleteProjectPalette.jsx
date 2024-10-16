import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteProjectPalette } from "../../managers/ProjectPaletteManager.jsx";

function DeleteProjectPalette({ args, palette, handleUpdatePalettes }) {
  const [modal, setModal] = useState(false);
  const projectPaletteId = palette.projectPaletteId;

  const toggle = () => {
    handleUpdatePalettes();
    setModal(!modal);
  };

  const handleDelete = () => {
    deleteProjectPalette(projectPaletteId).then(toggle);
  };

  return (
    <>
      <span className="rm-projectpalette-btn" onClick={toggle}>
        remove
      </span>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Delete Palette</ModalHeader>
        <ModalBody>
          Are you sure you want to remove this palette from your project?
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

export default DeleteProjectPalette;
