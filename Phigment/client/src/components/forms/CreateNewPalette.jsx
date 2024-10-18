import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { addPalette } from "../../managers/PaletteManager.jsx";

function CreateNewPalette({ args, currentUser, handlePaletteListChange }) {
  const [modal, setModal] = useState(false);
  const [palette, setPalette] = useState({});

  const handleSave = () => {
    if (palette.name) {
      const singlePalette = {
        name: palette.name,
        userId: currentUser.id,
        isPublic: false,
      };

      addPalette(singlePalette).then(toggle);
    } else {
      window.alert("Please give your palette a name!");
    }
  };

  const toggle = () => {
    handlePaletteListChange();
    setModal(!modal);
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Create New Palette
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Create New Palette</ModalHeader>
        <ModalBody>
          <Input
            placeholder="New Palette Name"
            onChange={(event) => {
              const paletteCopy = { ...palette };
              paletteCopy.name = event.target.value;
              setPalette(paletteCopy);
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

export default CreateNewPalette;
