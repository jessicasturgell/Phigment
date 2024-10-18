import DeleteSwatch from "../forms/SwatchDelete.jsx";
import "./Swatch.css";

export const Swatch = ({ swatch, handleSwatchListChange }) => {
  return (
    <>
      <tr className="table-dark">
        <td>
          <center>
            <div
              className="palette-details-swatch"
              key={swatch.id}
              style={{
                backgroundColor: swatch.hex,
              }}
            ></div>
          </center>
        </td>
        <td>{swatch.name}</td>
        <td>{swatch.hex}</td>
        <td>{swatch.rgb}</td>
        <td>
          <DeleteSwatch
            swatch={swatch}
            handleSwatchListChange={handleSwatchListChange}
          />
        </td>
      </tr>
    </>
  );
};
