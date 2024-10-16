import { useEffect, useState } from "react";
import { getPaletteByIdWithSwatches } from "../../managers/PaletteManager.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Swatch } from "../swatches/Swatch.jsx";

export const PaletteDetails = () => {
  const [palette, setPalette] = useState({});

  const navigate = useNavigate();

  let { paletteId } = useParams();

  const fetchSwatches = () => {
    getPaletteByIdWithSwatches(paletteId).then((palette) =>
      setPalette(palette)
    );
  };

  useEffect(() => {
    fetchSwatches();
  }, []);

  const handleSwatchListChange = () => {
    fetchSwatches();
  };

  return (
    <>
      {" "}
      <div className="palette-header-container">
        <div className="header-container">
          <h1>
            <Link className="palette-details-header" to={-1}>
              {palette.name}
            </Link>{" "}
            Details
          </h1>
        </div>
      </div>
      <hr className="palette-list-hr" />
      <div className="palette-header-container">
        <div className="header-container">
          <h2>Swatches in Palette</h2>{" "}
          <div>
            <Button color="primary" onClick={() => navigate("/explore")}>
              Add New Swatch
            </Button>
          </div>
        </div>
      </div>
      <Table>
        <tbody>
          <tr className="table-dark">
            <td>SWATCH</td>
            <td style={{ color: "cyan" }}>NAME</td>
            <td style={{ color: "magenta" }}>HEX</td>
            <td style={{ color: "yellow" }}>RGB</td>
            <td>MANAGE</td>
          </tr>
          {palette.swatches?.map((swatch) => (
            <Swatch
              key={swatch.id}
              swatch={swatch}
              handleSwatchListChange={handleSwatchListChange}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
