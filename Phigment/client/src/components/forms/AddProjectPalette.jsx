import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { getAllPalettes } from "../../managers/PaletteManager.jsx";
import { addProjectPalette } from "../../managers/ProjectPaletteManager.jsx";

function AddProjectPalette({
  args,
  currentUser,
  project,
  handleUpdatePalettes,
}) {
  const [palettes, setPalettes] = useState([]);
  const [selectedPaletteId, setSelectedPaletteId] = useState("");

  const [modal, setModal] = useState(false);

  const toggle = () => {
    handleUpdatePalettes();
    fetchAllPalettes();
    setModal(!modal);
  };

  const fetchAllPalettes = () => {
    getAllPalettes(currentUser).then((palettes) => setPalettes(palettes));
  };

  const handleSave = () => {
    if (selectedPaletteId) {
      const singleProjectPalette = {
        projectId: project.id,
        paletteId: selectedPaletteId,
      };

      addProjectPalette(singleProjectPalette).then(toggle);
    } else {
      window.alert("Please select a palette!");
    }
  };

  return (
    <div>
      <Button
        color="primary"
        onClick={toggle}
        size="sm"
        style={{ marginLeft: "1em" }}
      >
        Add Palette
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Add Palette to Project</ModalHeader>
        <ModalBody>
          <Input
            type="select"
            onChange={(e) => setSelectedPaletteId(e.target.value)}
          >
            <option value="">Select a palette</option>
            {palettes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Input>
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

export default AddProjectPalette;
