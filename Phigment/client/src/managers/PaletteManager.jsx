const baseUrl = "https://localhost:7021/api/Palette/";

export const getAllPalettes = (currentUser) => {
  return fetch(`${baseUrl}GetAllByUserId/${currentUser.id}`).then((res) =>
    res.json()
  );
};

export const addPalette = (palette) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(palette),
  })
    .then((res) => res.json())
    
};