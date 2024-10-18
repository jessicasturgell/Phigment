import "./Explore.css";
import chroma from "chroma-js";
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";
import AddSwatchToPalette from "../forms/AddSwatchToPalette.jsx";

export const Explore = ({ currentUser }) => {
  const [color, setColor] = useState("#ff00ff");
  const [textColor, setTextColor] = useState("");
  const [complementaryColor, setComplementaryColor] = useState("");
  const [analogousColors, setAnalogousColors] = useState([]);
  const [triadicColors, setTriadicColors] = useState([]);
  const [monochromaticColors, setMonochromaticColors] = useState([]);

  useEffect(() => {
    // sets the background image for this page
    document.body.style.backgroundImage =
      "url('/src/assets/phigment-bgelements-colorful.svg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // resets when leaving page
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);

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
    const analogousLeftHue = (hsl[0] - 30 + 360) % 360;
    const analogousLeft = chroma.hsl(analogousLeftHue, hsl[1], hsl[2]).hex();
    const analogousRightHue = (hsl[0] + 30) % 360;
    const analogousRight = chroma.hsl(analogousRightHue, hsl[1], hsl[2]).hex();
    setAnalogousColors([analogousLeft, analogousRight]);
  };

  const getTriadic = () => {
    const hsl = chroma(color).hsl();
    const triadicLeftHue = (hsl[0] - 120 + 360) % 360;
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
          <h1>
            Select a <span style={{ color: color }}>color</span>!
          </h1>
          <p>
            We will automatically generate some color palettes based on common
            color harmonies.
          </p>
          <span>
            Your selection:{" "}
            <span
              style={{
                backgroundColor: color,
                color: textColor, // contrast implementation
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
              <div className="swatch-btn">
                <AddSwatchToPalette currentUser={currentUser} color={color} />
              </div>
              <div>
                <span className="swatch-text">{color}</span>
              </div>
            </div>
            <div
              className="swatch"
              style={{ backgroundColor: complementaryColor }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette
                  currentUser={currentUser}
                  color={complementaryColor}
                />
              </div>
              <div>
                <span className="swatch-text">{complementaryColor}</span>
              </div>
            </div>
          </div>

          <h1>Analogous</h1>
          <div className="flex">
            <div
              className="swatch"
              style={{ backgroundColor: analogousColors[0] }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette
                  currentUser={currentUser}
                  color={analogousColors[0]}
                />
              </div>
              <div>
                <span className="swatch-text">{analogousColors[0]}</span>
              </div>
            </div>
            <div
              className="swatch"
              style={{
                backgroundColor: color,
              }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette currentUser={currentUser} color={color} />
              </div>
              <div>
                <span className="swatch-text">{color}</span>
              </div>
            </div>
            <div
              className="swatch"
              style={{ backgroundColor: analogousColors[1] }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette
                  currentUser={currentUser}
                  color={analogousColors[1]}
                />
              </div>
              <div>
                <span className="swatch-text">{analogousColors[1]}</span>
              </div>
            </div>
          </div>

          <h1>Triadic</h1>
          <div className="flex">
            <div
              className="swatch"
              style={{ backgroundColor: triadicColors[0] }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette
                  currentUser={currentUser}
                  color={triadicColors[0]}
                />
              </div>
              <div>
                <span className="swatch-text">{triadicColors[0]}</span>
              </div>
            </div>
            <div
              className="swatch"
              style={{
                backgroundColor: color,
              }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette currentUser={currentUser} color={color} />
              </div>
              <div>
                <span className="swatch-text">{color}</span>
              </div>
            </div>
            <div
              className="swatch"
              style={{ backgroundColor: triadicColors[1] }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette
                  currentUser={currentUser}
                  color={triadicColors[1]}
                />
              </div>
              <div>
                <span className="swatch-text">{triadicColors[1]}</span>
              </div>
            </div>
          </div>

          <h1>Monochromatic</h1>
          <div className="flex">
            <div
              className="swatch"
              style={{ backgroundColor: monochromaticColors[0] }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette
                  currentUser={currentUser}
                  color={monochromaticColors[0]}
                />
              </div>
              <div>
                <span className="swatch-text">{monochromaticColors[0]}</span>
              </div>
            </div>
            <div
              className="swatch"
              style={{
                backgroundColor: monochromaticColors[1],
              }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette
                  currentUser={currentUser}
                  color={monochromaticColors[1]}
                />
              </div>
              <div>
                <span className="swatch-text">{monochromaticColors[1]}</span>
              </div>
            </div>
            <div className="swatch" style={{ backgroundColor: color }}>
              <div className="swatch-btn">
                <AddSwatchToPalette currentUser={currentUser} color={color} />
              </div>
              <div>
                <span className="swatch-text">{color}</span>
              </div>
            </div>
            <div
              className="swatch"
              style={{ backgroundColor: monochromaticColors[2] }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette
                  currentUser={currentUser}
                  color={monochromaticColors[2]}
                />
              </div>
              <div>
                <span className="swatch-text">{monochromaticColors[2]}</span>
              </div>
            </div>
            <div
              className="swatch"
              style={{ backgroundColor: monochromaticColors[3] }}
            >
              <div className="swatch-btn">
                <AddSwatchToPalette
                  currentUser={currentUser}
                  color={monochromaticColors[3]}
                />
              </div>
              <div>
                <span className="swatch-text">{monochromaticColors[3]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
