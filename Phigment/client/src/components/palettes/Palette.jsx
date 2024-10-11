import { Card, CardBody, CardTitle } from "reactstrap";
import chroma from "chroma-js";
import "./Palette.css";
import { Link } from "react-router-dom";
import RenamePalette from "../forms/RenamePaletteForm.jsx";
import DeletePalette from "../forms/DeletePaletteForm.jsx";

export const Palette = ({ palette, currentUser, handlePaletteListChange }) => {
  const getTextColor = (hex) => {
    const contrastWithWhite = chroma.contrast("#ffffff", hex);
    const contrastWithBlack = chroma.contrast("#000000", hex);

    return contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000";
  };

  const hasSwatches = palette.swatches && palette.swatches.length > 0;

  return (
    <div className="palette-container">
      <Card className="my-2" key={palette.id} color="dark" inverse>
        <CardBody>
          <CardTitle tag="h5">
            <div className="palette-list-title-container">
              <Link
                to={`/palettes/${palette.id}`}
                className="palette-list-header-link"
              >
                {palette.name}
              </Link>
              <div className="flex palette-list-header-btns">
                <RenamePalette
                  currentUser={currentUser}
                  palette={palette}
                  handlePaletteListChange={handlePaletteListChange}
                />{" "}
                <span className="rename-delete-palette">|</span>
                <DeletePalette
                  currentUser={currentUser}
                  palette={palette}
                  handlePaletteListChange={handlePaletteListChange}
                />
              </div>
            </div>
          </CardTitle>
          <div className="flex">
            {hasSwatches ? (
              palette.swatches.map((swatch) => (
                <div
                  className="palette-list-swatch"
                  key={swatch.id}
                  style={{
                    backgroundColor: swatch.hex,
                    color: getTextColor(swatch.hex),
                  }}
                >
                  <span className="palette-list-swatch-text">{swatch.hex}</span>
                </div>
              ))
            ) : (
              <div className="palette-list-empty-swatch">
                <span>This palette is empty!</span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
