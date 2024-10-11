export const Swatch = ({ swatch }) => {
  return (
    <>
      {" "}
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
        <td className="text-center">{swatch.name}</td>
        <td className="text-center">{swatch.hex}</td>
        <td className="text-center">{swatch.rgb}</td>
        <td className="text-center">edit | delete</td>
      </tr>
    </>
  );
};
