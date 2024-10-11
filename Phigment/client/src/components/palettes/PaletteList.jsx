import { useEffect, useState } from "react";
import { getAllPalettesWithSwatches } from "../../managers/PaletteManager.jsx";
import { Palette } from "./palette.jsx";
import { Button } from "reactstrap";
import CreateNewPalette from "../forms/CreateNewPalette.jsx";

export const PaletteList = ({ currentUser }) => {
  const [palettes, setPalettes] = useState([]);

  const fetchPalettes = () => {
    if (currentUser && currentUser.id) {
      getAllPalettesWithSwatches(currentUser).then((palettes) =>
        setPalettes(palettes)
      );
    }
  };

  useEffect(() => {
    fetchPalettes();
  }, [currentUser]);

  const handlePaletteListChange = () => {
    fetchPalettes();
  };

  return (
    <>
      <div className="palette-header-container">
        <div className="header-container">
          <h1>
            My <span className="palette-list-header">Palettes</span>
          </h1>
          <div>
            <CreateNewPalette
              currentUser={currentUser}
              handlePaletteListChange={handlePaletteListChange}
            />
          </div>
        </div>
        <p>
          Here's an overview of all of your current palettes! Try clicking on a
          palette's title to access details for that palette.
        </p>
      </div>
      <hr className="palette-list-hr" />
      <div className="palette-list-container">
        {palettes.map((palette) => (
          <Palette
            key={palette.id}
            palette={palette}
            currentUser={currentUser}
            handlePaletteListChange={handlePaletteListChange}
          />
        ))}
      </div>
    </>
  );
};
