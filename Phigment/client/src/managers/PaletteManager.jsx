const baseUrl = "https://localhost:7021/api/Palette/";

export const getAllPalettes = (currentUser) => {
  return fetch(`${baseUrl}GetAllByUserId/${currentUser.id}`).then((res) =>
    res.json()
  );
};

export const getAllPalettesWithSwatches = (currentUser) => {
  return fetch(`${baseUrl}GetAllByUserIdWithSwatches/${currentUser.id}`).then(
    (res) => res.json()
  );
};

export const getAllPalettesByProjectIdWithSwatches = (projectId) => {
  return fetch(`${baseUrl}GetAllByProjectIdWithSwatches/${projectId}`).then(
    (res) => res.json()
  );
};

export const getPaletteByIdWithSwatches = (paletteId) => {
  return fetch(`${baseUrl}GetByIdWithSwatches/${paletteId}`).then((res) =>
    res.json()
  );
};

export const getProfilePaletteByUserIdWithSwatches = (currentUser) => {
  return fetch(
    `${baseUrl}GetAllUserProfilePalettesByUserIdWithSwatches/${currentUser.id}`
  ).then((res) => res.json());
};

export const addPalette = (palette) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(palette),
  }).then((res) => res.json());
};

export const updatePalette = (palette) => {
  return fetch(`${baseUrl}${palette.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(palette),
  });
};

export const deletePalette = (paletteId) => {
  return fetch(`${baseUrl}${paletteId}`, {
    method: "DELETE",
  });
};
