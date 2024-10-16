const baseUrl = "https://localhost:7021/api/ProjectPalette/";

export const addProjectPalette = (projectPalette) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectPalette),
  }).then((res) => res.json());
};

export const deleteProjectPalette = (projectPaletteId) => {
  return fetch(`${baseUrl}${projectPaletteId}`, {
    method: "DELETE",
  });
};
