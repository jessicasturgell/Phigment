const baseUrl = "https://localhost:7021/api/Project/";

export const getAllProjects = (currentUser) => {
  return fetch(`${baseUrl}GetAllByUserId/${currentUser.id}`).then((res) =>
    res.json()
  );
};