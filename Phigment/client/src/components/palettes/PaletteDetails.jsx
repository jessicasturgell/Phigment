import { useEffect, useState } from "react";
import { getPaletteByIdWithSwatches } from "../../managers/PaletteManager.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Swatch } from "../swatches/Swatch.jsx";

export const PaletteDetails = () => {
  const [palette, setPalette] = useState({});

  let { paletteId } = useParams();

  console.log(paletteId);

  useEffect(() => {
    getPaletteByIdWithSwatches(paletteId).then((palette) =>
      setPalette(palette)
    );
  }, [paletteId]);

  return (
    <>
      {" "}
      <div className="palette-header-container">
        <div className="header-container">
          <h1>
            <Link className="palette-details-header" to={"/palettes"}>
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
            <Button>Add New Swatch</Button>
          </div>
        </div>
      </div>
      <Table>
        <tbody>
          <tr className="table-dark">
            <td className="text-center">SWATCH</td>
            <td className="text-center" style={{ color: "cyan" }}>
              NAME
            </td>
            <td className="text-center" style={{ color: "magenta" }}>
              HEX
            </td>
            <td className="text-center" style={{ color: "yellow" }}>
              RGB
            </td>
            <td className="text-center">MANAGE</td>
          </tr>
          {palette.swatches?.map((swatch) => (
            <Swatch key={swatch.id} swatch={swatch} />
          ))}
        </tbody>
      </Table>
    </>
  );
};
