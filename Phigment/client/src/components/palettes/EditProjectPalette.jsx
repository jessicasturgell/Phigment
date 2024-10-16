import { CardTitle } from "reactstrap";
import chroma from "chroma-js";
import "./Palette.css";

export const EditProjectPalette = ({ palette }) => {
  const getTextColor = (hex) => {
    const contrastWithWhite = chroma.contrast("#ffffff", hex);
    const contrastWithBlack = chroma.contrast("#000000", hex);

    return contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000";
  };

  const hasSwatches = palette.swatches && palette.swatches.length > 0;

  return (
    <div className="palette-container">
      <CardTitle tag="h5">
        <div className="palette-list-title-container">
          <span style={{ color: "white" }}>{palette.name}</span>
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
            <span style={{ color: "white" }}>This palette is empty!</span>
          </div>
        )}
      </div>
    </div>
  );
};
