const baseUrl = "https://localhost:7021/api/PaletteSwatch/";

export const addPaletteSwatch = (paletteSwatch) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paletteSwatch),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.id;
    });
};

export const deletePaletteSwatch = (paletteSwatchId) => {
  return fetch(`${baseUrl}${paletteSwatchId}`, {
    method: "DELETE",
  });
};
