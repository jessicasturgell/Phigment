import React, { useEffect, useState } from "react";
import chroma, { valid } from "chroma-js";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import { addPalette, getAllPalettes } from "../../managers/PaletteManager.jsx";
import { addPaletteSwatch } from "../../managers/PaletteSwatchManager.jsx";
import { addSwatch, getAllSwatches } from "../../managers/SwatchManager.jsx";

function AddSwatchToPalette({ args, currentUser, color }) {
  const [modal, setModal] = useState(false);
  const [palettes, setPalettes] = useState([]);
  const [swatches, setSwatches] = useState([]);
  const [selectedPaletteId, setSelectedPaletteId] = useState(null);
  const [newPaletteName, setNewPaletteName] = useState("");
  const [newSwatchName, setNewSwatchName] = useState("");

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      getAllPalettes(currentUser).then((palettes) => setPalettes(palettes));
      getAllSwatches(currentUser).then((swatches) => setSwatches(swatches));
    }
  }, [currentUser]);

  const handleSave = (event) => {
    event.preventDefault();

    if (newPaletteName) {
      const paletteObj = {
        name: newPaletteName,
        userId: currentUser.id,
      };

      addPalette(paletteObj)
        .then((paletteResponse) => {
          const swatchObj = {
            name: newSwatchName,
            userId: currentUser.id,
            hex: color,
            rgb: chroma(color).rgb().toString(),
            hsl: chroma(color).hsl().toString(),
          };

          const foundSwatch = swatches.find(
            (swatch) =>
              swatch.hex === swatchObj.hex && swatch.name === swatchObj.name
          );

          if (foundSwatch) {
            const paletteSwatchObj = {
              paletteId: paletteResponse.id,
              swatchId: foundSwatch.id,
            };
            addPaletteSwatch(paletteSwatchObj);
          } else {
            addSwatch(swatchObj).then((swatchResponse) => {
              const paletteSwatchObj = {
                paletteId: paletteResponse.id,
                swatchId: swatchResponse,
              };
              addPaletteSwatch(paletteSwatchObj);
            });
          }
        })
        .then(() => {
          toggle();
        });
    } else {
      const swatchObj = {
        name: newSwatchName,
        userId: currentUser.id,
        hex: color,
        rgb: chroma(color).rgb().toString(),
        hsl: chroma(color).hsl().toString(),
      };

      const foundSwatch = swatches.find(
        (swatch) =>
          swatch.hex === swatchObj.hex && swatch.name === swatchObj.name
      );

      if (foundSwatch) {
        const paletteSwatchObj = {
          paletteId: selectedPaletteId,
          swatchId: foundSwatch.id,
        };
        addPaletteSwatch(paletteSwatchObj);
      } else {
        addSwatch(swatchObj).then((swatchResponse) => {
          const paletteSwatchObj = {
            paletteId: selectedPaletteId,
            swatchId: swatchResponse,
          };
          addPaletteSwatch(paletteSwatchObj);
        });
      }
    }

    toggle();
  };

  return (
    <div>
      <img width="20px" src="src/assets/add.png" onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>Save Color Swatch</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input
              id="createSwatch"
              name="createSwatch"
              type="text"
              placeholder="New Swatch Name (optional)"
              onChange={(e) => setNewSwatchName(e.target.value)}
            ></Input>
            <hr />
            <Label for="paletteSelect">
              Add this swatch to an existing palette:
            </Label>
            <Input
              id="paletteSelect"
              name="select"
              type="select"
              value={selectedPaletteId || ""}
              onChange={(e) => setSelectedPaletteId(e.target.value)}
            >
              <option value="">Select a palette</option>
              {palettes.map((palette) => (
                <option key={palette.id} value={palette.id}>
                  {palette.name}
                </option>
              ))}
            </Input>
            <hr />
            <center>
              <h5>OR</h5>
            </center>
            <hr />
            <Label for="paletteCreate">
              Create a new palette for this swatch:
            </Label>
            <Input
              id="paletteCreate"
              name="create"
              type="text"
              placeholder="New Palette Name"
              onChange={(e) => setNewPaletteName(e.target.value)}
            ></Input>
          </FormGroup>
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

export default AddSwatchToPalette;

// next time try something like this!!!!
// addthing(palette).then(setState).then(() => {addnextThing(recentlysetstate)}).then(setstate)
