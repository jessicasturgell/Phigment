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

function RenamePalette({
  args,
  currentUser,
  palette,
  handlePaletteListChange,
}) {
  const [modal, setModal] = useState(false);
  const [updatedPalette, setUpdatedPalette] = useState({});
  const [isPublic, setIsPublic] = useState(false);

  const toggle = () => {
    handlePaletteListChange();
    setModal(!modal);
  };

  const handleSave = () => {
    const editedPalette = {
      id: palette.id,
      name: updatedPalette.name || palette.name,
      userId: currentUser.id,
      isPublic: isPublic,
    };

    updatePalette(editedPalette).then(toggle);
  };

  return (
    <div>
      <span className="rename-delete-palette" onClick={toggle}>
        edit
      </span>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Edit Palette</ModalHeader>
        <ModalBody>
          <Input
            defaultValue={palette.name}
            onChange={(event) => {
              const paletteCopy = { ...palette };
              paletteCopy.name = event.target.value;
              setUpdatedPalette(paletteCopy);
            }}
          ></Input>
          <br />
          <Input
            type="checkbox"
            style={{ marginRight: "10px" }}
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          ></Input>
          Display in profile showcase.
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
