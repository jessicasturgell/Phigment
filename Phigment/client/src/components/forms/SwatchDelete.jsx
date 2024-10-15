import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TrashBin from "../../assets/trash-bin.png";
import { deletePaletteSwatch } from "../../managers/PaletteSwatchManager.jsx";

function DeleteSwatch({ args, swatch, handleSwatchListChange }) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    handleSwatchListChange();
    setModal(!modal);
  };

  const handleDelete = () => {
    deletePaletteSwatch(swatch.paletteSwatch.id).then(toggle);
  };

  return (
    <div>
      <img className="trash-btn" src={TrashBin} alt="Delete" onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Delete Swatch</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this swatch from your palette? You
          can't undo this action.
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

export default DeleteSwatch;
