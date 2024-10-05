import "./Explore.css";
import chroma from "chroma-js";
import { useEffect, useState } from "react";

export const Explore = () => {
  const [color, setColor] = useState("magenta");
  const [complementaryColor, setComplementaryColor] = useState("magenta");

  const getComplement = () => {
    const hsl = chroma(color).hsl();
    const complementaryHue = (hsl[0] + 180) % 360;
    const complementary = chroma.hsl(complementaryHue, hsl[1], hsl[2]).hex();
    setComplementaryColor(complementary);
  };

  useEffect(() => {
    getComplement();
  }, [color]);

  return (
    <>
      <div className="color-container">
        <h1>Select a color</h1>
        <input
          type="color"
          defaultValue="#FF00FF"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <div
          className="swatch"
          style={{
            backgroundColor: color,
          }}
        ></div>
        <h1>Complementary</h1>
        <div
          className="swatch"
          style={{ backgroundColor: complementaryColor }}
        ></div>
      </div>
    </>
  );
};
