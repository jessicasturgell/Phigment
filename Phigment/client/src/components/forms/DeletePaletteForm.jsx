import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deletePalette } from "../../managers/PaletteManager.jsx";

function DeletePalette({ args, palette, handlePaletteListChange }) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    handlePaletteListChange();
    setModal(!modal);
  };

  const handleDelete = () => {
    deletePalette(palette.id).then(toggle);
  };

  return (
    <div>
      <span className="rename-delete-palette" onClick={toggle}>
        delete
      </span>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Delete Palette</ModalHeader>
        <ModalBody>
          Are you sure you want to delete your palette "{palette.name}"?
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
    </div>
  );
}

export default DeletePalette;
