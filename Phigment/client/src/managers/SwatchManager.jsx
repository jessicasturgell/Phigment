const baseUrl = "https://localhost:7021/api/Swatch/";

export const addSwatch = (swatch) => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(swatch),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.id;
    });
};
