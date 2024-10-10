import { Card, CardBody, CardTitle } from "reactstrap";
import chroma from "chroma-js";
import "./Palette.css";
import { Link } from "react-router-dom";

export const Palette = ({ palette }) => {
  const getTextColor = (hex) => {
    const contrastWithWhite = chroma.contrast("#ffffff", hex);
    const contrastWithBlack = chroma.contrast("#000000", hex);

    return contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000";
  };

  return (
    <div className="palette-container">
      <Card className="my-2" key={palette.id} color="dark" inverse>
        <CardBody>
          <CardTitle className="palette-list-name" tag="h5">
            <Link
              to={`/palettes/${palette.id}`}
              className="palette-list-header-link"
            >
              {palette.name}
            </Link>
          </CardTitle>
          <div className="flex">
            {palette.swatches.map((swatch) => (
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
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
