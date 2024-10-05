import "./Explore.css";
import chroma from "chroma-js";
import { useEffect, useState } from "react";

export const Explore = () => {
  const [color, setColor] = useState("magenta");
  const [complementaryColor, setComplementaryColor] = useState("");
  const [analogousColors, setAnalogousColors] = useState([]);
  const [triadicColors, setTriadicColors] = useState([]);

  const getComplement = () => {
    const hsl = chroma(color).hsl();
    const complementaryHue = (hsl[0] + 180) % 360;
    const complementary = chroma.hsl(complementaryHue, hsl[1], hsl[2]).hex();
    setComplementaryColor(complementary);
  };

  const getAnalogous = () => {
    const hsl = chroma(color).hsl();
    const analogousLeftHue = (hsl[0] - 30) % 360;
    const analogousLeft = chroma.hsl(analogousLeftHue, hsl[1], hsl[2]).hex();
    const analogousRightHue = (hsl[0] + 30) % 360;
    const analogousRight = chroma.hsl(analogousRightHue, hsl[1], hsl[2]).hex();
    setAnalogousColors([analogousLeft, analogousRight]);
  };

  const getTriadic = () => {
    const hsl = chroma(color).hsl();
    const triadicLeftHue = (hsl[0] - 120) % 360;
    const triadicLeft = chroma.hsl(triadicLeftHue, hsl[1], hsl[2]).hex();
    const triadicRightHue = (hsl[0] + 120) % 360;
    const triadicRight = chroma.hsl(triadicRightHue, hsl[1], hsl[2]).hex();
    setTriadicColors([triadicLeft, triadicRight]);
  };

  useEffect(() => {
    getComplement();
    getAnalogous();
    getTriadic();
  }, [color]);

  return (
    <>
      <div className="color-container">
        <div>
          <div className="flex">
            <h1>Select a color</h1>
            <input
              type="color"
              defaultValue="#FF00FF"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div
            className="swatch"
            style={{
              backgroundColor: color,
            }}
          ></div>
        </div>
        <div>
          <h1>Complementary</h1>
          <div className="flex">
            <div
              className="swatch"
              style={{
                backgroundColor: color,
              }}
            ></div>
            <div
              className="swatch"
              style={{ backgroundColor: complementaryColor }}
            ></div>
          </div>
          <h1>Analogous</h1>
          <div className="flex">
            <div
              className="swatch"
              style={{ backgroundColor: analogousColors[0] }}
            ></div>
            <div
              className="swatch"
              style={{
                backgroundColor: color,
              }}
            ></div>
            <div
              className="swatch"
              style={{ backgroundColor: analogousColors[1] }}
            ></div>
          </div>
          <h1>Triadic</h1>
          <div className="flex">
            <div
              className="swatch"
              style={{ backgroundColor: triadicColors[0] }}
            ></div>
            <div
              className="swatch"
              style={{
                backgroundColor: color,
              }}
            ></div>
            <div
              className="swatch"
              style={{ backgroundColor: triadicColors[1] }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
