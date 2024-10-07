import "./Explore.css";
import chroma from "chroma-js";
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";

export const Explore = () => {
  const [color, setColor] = useState("#ff00ff");
  const [textColor, setTextColor] = useState("");
  const [complementaryColor, setComplementaryColor] = useState("");
  const [analogousColors, setAnalogousColors] = useState([]);
  const [triadicColors, setTriadicColors] = useState([]);
  const [monochromaticColors, setMonochromaticColors] = useState([]);

  const getTextColor = () => {
    const contrastWithWhite = chroma.contrast("#ffffff", color);
    const contrastWithBlack = chroma.contrast("#000000", color);

    const chosenTextColor =
      contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000";
    setTextColor(chosenTextColor);
  };

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

  const getMonochromatic = () => {
    const hsl = chroma(color).hsl();
    const monochromatic = [
      chroma.hsl(hsl[0], hsl[1], hsl[2] * 1.5).hex(), // lightest
      chroma.hsl(hsl[0], hsl[1], hsl[2] * 1.25).hex(), // lighter
      chroma.hsl(hsl[0], hsl[1], hsl[2] * 0.75).hex(), // darker
      chroma.hsl(hsl[0], hsl[1], hsl[2] * 0.5).hex(), // darkest
    ];
    setMonochromaticColors(monochromatic);
  };

  useEffect(() => {
    getTextColor();
    getComplement();
    getAnalogous();
    getTriadic();
    getMonochromatic();
  }, [color]);

  return (
    <>
      <div className="color-container">
        <div className="color-picker-container">
          <h1>Select a color!</h1>
          <p>
            We will automatically generate some color palettes based on common
            color harmonies.
          </p>
          <span>
            Your selection:{" "}
            <span
              style={{
                backgroundColor: color,
                color: textColor, // apca contrast implementation
              }}
            >
              {color}
            </span>
          </span>
          <HexColorPicker color={color} onChange={setColor} />
        </div>
        <div>
          <h1>Complementary</h1>
          <div className="flex">
            <div
              className="swatch"
              style={{
                backgroundColor: color,
              }}
            >
              <span className="swatch-text">{color}</span>
            </div>
            <div
              className="swatch"
              style={{ backgroundColor: complementaryColor }}
            >
              <span className="swatch-text">{complementaryColor}</span>
            </div>
          </div>
          <h1>Analogous</h1>
          <div className="flex">
            <div
              className="swatch"
              style={{ backgroundColor: analogousColors[0] }}
            >
              <span className="swatch-text">{analogousColors[0]}</span>
            </div>
            <div
              className="swatch"
              style={{
                backgroundColor: color,
              }}
            >
              <span className="swatch-text">{color}</span>
            </div>
            <div
              className="swatch"
              style={{ backgroundColor: analogousColors[1] }}
            >
              <span className="swatch-text">{analogousColors[1]}</span>
            </div>
          </div>
          <h1>Triadic</h1>
          <div className="flex">
            <div
              className="swatch"
              style={{ backgroundColor: triadicColors[0] }}
            >
              <span className="swatch-text">{triadicColors[0]}</span>
            </div>
            <div
              className="swatch"
              style={{
                backgroundColor: color,
              }}
            >
              <span className="swatch-text">{color}</span>
            </div>
            <div
              className="swatch"
              style={{ backgroundColor: triadicColors[1] }}
            >
              <span className="swatch-text">{triadicColors[1]}</span>
            </div>
          </div>
          <h1>Monochromatic</h1>
          <div className="flex">
            <div
              className="swatch"
              style={{ backgroundColor: monochromaticColors[0] }}
            >
              <span className="swatch-text">{monochromaticColors[0]}</span>
            </div>
            <div
              className="swatch"
              style={{
                backgroundColor: monochromaticColors[1],
              }}
            >
              <span className="swatch-text">{monochromaticColors[1]}</span>
            </div>
            <div className="swatch" style={{ backgroundColor: color }}>
              <span className="swatch-text">{color}</span>
            </div>
            <div
              className="swatch"
              style={{ backgroundColor: monochromaticColors[2] }}
            >
              <span className="swatch-text">{monochromaticColors[2]}</span>
            </div>
            <div
              className="swatch"
              style={{ backgroundColor: monochromaticColors[3] }}
            >
              <span className="swatch-text">{monochromaticColors[3]}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
