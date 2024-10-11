import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { updatePalette } from "../../managers/PaletteManager.jsx";

function RenamePalette({ args, currentUser, palette, handlePaletteListChange }) {
  const [modal, setModal] = useState(false);
  const [updatedPalette, setUpdatedPalette] = useState({});

  const toggle = () => {
    handlePaletteListChange();
    setModal(!modal);
  };

  const handleSave = () => {
    const editedPalette = {
      id: palette.id,
      name: updatedPalette.name,
      userId: currentUser.id,
      isPublic: false,
    };

    updatePalette(editedPalette).then(toggle);
  };

  return (
    <div>
      <span className="rename-delete-palette" onClick={toggle}>
        rename
      </span>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Rename Palette</ModalHeader>
        <ModalBody>
          <Input
            placeholder={palette.name}
            onChange={(event) => {
              const paletteCopy = { ...palette };
              paletteCopy.name = event.target.value;
              setUpdatedPalette(paletteCopy);
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

export default RenamePalette;
